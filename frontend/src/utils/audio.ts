// Sintetizador de áudio fiel ao hardware da Urna Eletrônica Brasileira (TSE)

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Bipe metálico característico das teclas da urna
 */
export function playKeySound(): void {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle'; // Timbre mais encorpado e tátil
    osc.frequency.setValueAtTime(1050, ctx.currentTime);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.055);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  } catch {
    // Silencia se o navegador bloquear
  }
}

/**
 * Som clássico de encerramento da votação (o "pililili" / tom contínuo do TSE)
 */
export function playConfirmaSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    // Frequência primária oficial da urna (~1250 Hz)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1250, now);

    // Envelope de volume com início direto e término abrupto característico
    gain1.gain.setValueAtTime(0.35, now);
    gain1.gain.setValueAtTime(0.35, now + 0.85);
    gain1.gain.linearRampToValueAtTime(0.0001, now + 0.92);

    osc1.connect(gain1);
    gain1.connect(ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.93);
  } catch {
    // Silencia se o navegador bloquear
  }
}

/**
 * Som de erro / comando inválido
 */
export function playErrorSound(): void {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.setValueAtTime(260, now + 0.12);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  } catch {
    // Silencia se o navegador bloquear
  }
}
