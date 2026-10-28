package br.unijorge.urna.view;

import br.unijorge.urna.model.Cargo;
import br.unijorge.urna.model.Candidato;
import br.unijorge.urna.service.UrnaService;
import br.unijorge.urna.util.SomUrna;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.Timer;
import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Toolkit;
import java.util.Optional;

public class UrnaFrame extends JFrame {
    private static final Color FUNDO_TELA = new Color(0xEDEDED);
    private static final Color CORPO = new Color(0xD9D9D2);

    private final UrnaService service;
    private final Cargo[] ordem = Cargo.values();
    private final StringBuilder digitos = new StringBuilder();

    private int indiceCargo;
    private boolean branco;
    private boolean finalizada;

    private final JLabel lblCargo = rotulo(22, Font.BOLD);
    private final JLabel lblNumero = rotulo(44, Font.BOLD);
    private final JLabel lblNome = rotulo(18, Font.PLAIN);
    private final JLabel lblPartido = rotulo(16, Font.PLAIN);
    private final JLabel lblDetalhes = rotulo(16, Font.PLAIN);
    private final JLabel lblAviso = rotulo(13, Font.PLAIN);

    public UrnaFrame(UrnaService service) {
        super("Urna Cidadã");
        this.service = service;

        setDefaultCloseOperation(EXIT_ON_CLOSE);
        setJMenuBar(criarMenu());
        setLayout(new BorderLayout());
        add(criarTela(), BorderLayout.CENTER);
        add(criarTeclado(), BorderLayout.EAST);
        getContentPane().setBackground(CORPO);

        setSize(860, 520);
        setResizable(false);
        setLocationRelativeTo(null);
        configurarAtalhosTeclado();
        atualizarTela();
    }

    private void configurarAtalhosTeclado() {
        java.awt.KeyboardFocusManager.getCurrentKeyboardFocusManager().addKeyEventDispatcher(e -> {
            if (e.getID() == java.awt.event.KeyEvent.KEY_PRESSED && isActive()) {
                char c = e.getKeyChar();
                if (c >= '0' && c <= '9') {
                    digitar(String.valueOf(c));
                    return true;
                } else if (e.getKeyCode() == java.awt.event.KeyEvent.VK_ENTER) {
                    confirmar();
                    return true;
                } else if (e.getKeyCode() == java.awt.event.KeyEvent.VK_BACK_SPACE || e.getKeyCode() == java.awt.event.KeyEvent.VK_ESCAPE) {
                    corrigir();
                    return true;
                } else if (c == 'b' || c == 'B') {
                    votarBranco();
                    return true;
                }
            }
            return false;
        });
    }

    private JMenuBar criarMenu() {
        JMenuItem item = new JMenuItem("Apuração");
        item.addActionListener(e -> mostrarApuracao());
        JMenu menu = new JMenu("Mesário");
        menu.add(item);
        JMenuBar barra = new JMenuBar();
        barra.add(menu);
        return barra;
    }

    private JPanel criarTela() {
        JPanel tela = new JPanel(new GridLayout(6, 1, 0, 6));
        tela.setBackground(FUNDO_TELA);
        tela.setBorder(BorderFactory.createCompoundBorder(
                BorderFactory.createEmptyBorder(16, 16, 16, 8),
                BorderFactory.createCompoundBorder(
                        BorderFactory.createLineBorder(Color.DARK_GRAY, 3),
                        BorderFactory.createEmptyBorder(14, 18, 14, 18))));
        tela.add(lblCargo);
        tela.add(lblNumero);
        tela.add(lblNome);
        tela.add(lblPartido);
        tela.add(lblDetalhes);
        tela.add(lblAviso);
        return tela;
    }

    private JPanel criarTeclado() {
        JPanel teclado = new JPanel(new BorderLayout(0, 14));
        teclado.setBackground(CORPO);
        teclado.setBorder(BorderFactory.createEmptyBorder(16, 8, 16, 16));
        teclado.setPreferredSize(new Dimension(300, 0));

        JPanel numeros = new JPanel(new GridLayout(4, 3, 8, 8));
        numeros.setOpaque(false);
        String[] teclas = {"1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", ""};
        for (String t : teclas) {
            if (t.isEmpty()) {
                numeros.add(new JLabel());
            } else {
                JButton b = botao(t, Color.DARK_GRAY, Color.WHITE);
                b.addActionListener(e -> digitar(t));
                numeros.add(b);
            }
        }

        JPanel acoes = new JPanel(new GridLayout(1, 3, 8, 0));
        acoes.setOpaque(false);
        acoes.setPreferredSize(new Dimension(0, 70));

        JButton btBranco = botao("BRANCO", Color.WHITE, Color.BLACK);
        btBranco.addActionListener(e -> votarBranco());
        JButton btCorrige = botao("CORRIGE", new Color(0xE8651A), Color.BLACK);
        btCorrige.addActionListener(e -> corrigir());
        JButton btConfirma = botao("CONFIRMA", new Color(0x2E9E4F), Color.BLACK);
        btConfirma.addActionListener(e -> confirmar());

        acoes.add(btBranco);
        acoes.add(btCorrige);
        acoes.add(btConfirma);

        teclado.add(numeros, BorderLayout.CENTER);
        teclado.add(acoes, BorderLayout.SOUTH);
        return teclado;
    }

    private JButton botao(String texto, Color fundo, Color letra) {
        JButton b = new JButton(texto);
        b.setBackground(fundo);
        b.setForeground(letra);
        b.setOpaque(true);
        b.setFocusPainted(false);
        b.setFont(new Font(Font.SANS_SERIF, Font.BOLD, texto.length() > 1 ? 12 : 22));
        return b;
    }

    private static JLabel rotulo(int tamanho, int estilo) {
        JLabel l = new JLabel();
        l.setFont(new Font(Font.SANS_SERIF, estilo, tamanho));
        return l;
    }

    private Cargo cargoAtual() {
        return ordem[indiceCargo];
    }

    private void digitar(String d) {
        if (finalizada || branco || digitos.length() >= cargoAtual().getDigitos()) {
            return;
        }
        SomUrna.tocarClique();
        digitos.append(d);
        atualizarTela();
    }

    private void votarBranco() {
        if (finalizada || digitos.length() > 0) {
            return;
        }
        SomUrna.tocarClique();
        branco = true;
        atualizarTela();
    }

    private void corrigir() {
        if (finalizada) {
            return;
        }
        SomUrna.tocarClique();
        digitos.setLength(0);
        branco = false;
        atualizarTela();
    }

    private void confirmar() {
        if (finalizada) {
            return;
        }
        Cargo cargo = cargoAtual();

        if (branco) {
            service.registrarBranco(cargo);
        } else if (digitos.length() == cargo.getDigitos()) {
            String numero = digitos.toString();
            if (service.buscarCandidato(cargo, numero).isPresent()) {
                service.registrarValido(cargo, numero);
            } else {
                service.registrarNulo(cargo);
            }
        } else {
            SomUrna.tocarAlerta();
            return;
        }

        digitos.setLength(0);
        branco = false;

        if (indiceCargo < ordem.length - 1) {
            SomUrna.tocarClique();
            indiceCargo++;
        } else {
            finalizada = true;
            SomUrna.tocarConfirma();
            Timer timer = new Timer(3000, e -> reiniciar());
            timer.setRepeats(false);
            timer.start();
        }
        atualizarTela();
    }

    private void reiniciar() {
        indiceCargo = 0;
        finalizada = false;
        digitos.setLength(0);
        branco = false;
        atualizarTela();
    }

    private void atualizarTela() {
        lblNome.setText(" ");
        lblPartido.setText(" ");
        lblDetalhes.setText(" ");
        lblAviso.setText(" ");

        if (finalizada) {
            lblCargo.setText(" ");
            lblNumero.setText("FIM");
            lblNome.setText("Voto registrado. Obrigado por participar!");
            return;
        }

        Cargo cargo = cargoAtual();
        lblCargo.setText("SEU VOTO PARA " + cargo.getNome());

        if (branco) {
            lblNumero.setText(" ");
            lblNome.setText("VOTO EM BRANCO");
            lblAviso.setText("Aperte CONFIRMA para confirmar | CORRIGE para refazer");
            return;
        }

        StringBuilder campo = new StringBuilder(digitos);
        while (campo.length() < cargo.getDigitos()) {
            campo.append('_');
        }
        lblNumero.setText(String.join(" ", campo.toString().split("")));

        if (digitos.length() == cargo.getDigitos()) {
            Optional<Candidato> candidato = service.buscarCandidato(cargo, digitos.toString());
            if (candidato.isPresent()) {
                Candidato c = candidato.get();
                lblNome.setText("Nome: " + c.getNome());
                lblPartido.setText("Partido: " + c.getPartido().sigla() + " - " + c.getPartido().nome());
                lblDetalhes.setText(c.getDetalhes().isEmpty() ? " " : c.getDetalhes());
            } else {
                lblNome.setText("NÚMERO ERRADO");
                lblPartido.setText("VOTO NULO");
            }
            lblAviso.setText("Aperte CONFIRMA para confirmar | CORRIGE para refazer");
        }
    }

    private void mostrarApuracao() {
        try {
            new ApuracaoDialog(this, service.apurar(), service.getFonteDados()).setVisible(true);
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this, "Erro ao apurar: " + e.getMessage(),
                    "Erro", JOptionPane.ERROR_MESSAGE);
        }
    }
}
