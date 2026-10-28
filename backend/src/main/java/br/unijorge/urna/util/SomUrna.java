package br.unijorge.urna.util;

import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.LineUnavailableException;
import javax.sound.sampled.SourceDataLine;

/**
 * Utilitário para sintetizar os sons característicos da Urna Eletrônica
 * utilizando a API nativa javax.sound.sampled (sem dependência de arquivos externos).
 */
public final class SomUrna {
    private static final float SAMPLE_RATE = 44100f;

    private SomUrna() {
    }

    /**
     * Som de clique curto ao pressionar teclas numéricas ou botões.
     */
    public static void tocarClique() {
        executarAssincrono(() -> gerarTom(950, 45, 0.35));
    }

    /**
     * Som clássico de confirmação final da votação (urna do TSE).
     */
    public static void tocarConfirma() {
        executarAssincrono(() -> gerarTom(1250, 850, 0.65));
    }

    /**
     * Som de alerta para voto nulo ou ação incorreta.
     */
    public static void tocarAlerta() {
        executarAssincrono(() -> gerarTom(420, 220, 0.5));
    }

    private static void executarAssincrono(Runnable tarefa) {
        Thread thread = new Thread(tarefa, "som-urna");
        thread.setDaemon(true);
        thread.start();
    }

    private static void gerarTom(int frequencia, int duracaoMs, double volume) {
        try {
            AudioFormat format = new AudioFormat(SAMPLE_RATE, 16, 1, true, false);
            try (SourceDataLine line = AudioSystem.getSourceDataLine(format)) {
                line.open(format);
                line.start();

                int numSamples = (int) (SAMPLE_RATE * (duracaoMs / 1000.0));
                byte[] buffer = new byte[numSamples * 2];

                int fadeSamples = Math.min((int) (SAMPLE_RATE * 0.015), numSamples / 4);

                for (int i = 0; i < numSamples; i++) {
                    double envelope = 1.0;
                    if (i < fadeSamples) {
                        envelope = (double) i / fadeSamples;
                    } else if (i > numSamples - fadeSamples) {
                        envelope = (double) (numSamples - i) / fadeSamples;
                    }

                    double angle = 2.0 * Math.PI * i * frequencia / SAMPLE_RATE;
                    short sample = (short) (Math.sin(angle) * Short.MAX_VALUE * volume * envelope);

                    buffer[2 * i] = (byte) (sample & 0xFF);
                    buffer[2 * i + 1] = (byte) ((sample >> 8) & 0xFF);
                }

                line.write(buffer, 0, buffer.length);
                line.drain();
            }
        } catch (LineUnavailableException | IllegalArgumentException ignored) {
            // Fallback silencioso caso o ambiente não possua dispositivo de áudio
        }
    }
}
