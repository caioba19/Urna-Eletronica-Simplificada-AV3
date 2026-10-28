package br.unijorge.urna.view;

import br.unijorge.urna.model.Apuracao;
import br.unijorge.urna.model.Candidato;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import java.awt.Font;
import java.util.List;
import java.util.Map;

public class ApuracaoDialog extends JDialog {

    public ApuracaoDialog(JFrame pai, List<Apuracao> apuracoes, String fonte) {
        super(pai, "Apuração", true);

        JTextArea area = new JTextArea(montarTexto(apuracoes, fonte));
        area.setEditable(false);
        area.setFont(new Font(Font.MONOSPACED, Font.PLAIN, 14));
        area.setMargin(new java.awt.Insets(12, 12, 12, 12));

        add(new JScrollPane(area));
        setSize(520, 520);
        setLocationRelativeTo(pai);
    }

    private String montarTexto(List<Apuracao> apuracoes, String fonte) {
        StringBuilder sb = new StringBuilder();
        sb.append("Fonte dos dados: ").append(fonte).append("\n\n");

        for (Apuracao a : apuracoes) {
            sb.append("=== ").append(a.cargo().getNome()).append(" ===\n");
            for (Map.Entry<Candidato, Long> e : a.votosPorCandidato().entrySet()) {
                Candidato c = e.getKey();
                sb.append(String.format("%-6s %-24s %-4s %d%n",
                        c.getNumero(), c.getNome(), c.getPartido().sigla(), e.getValue()));
            }
            sb.append(String.format("%nBrancos: %d%nNulos:   %d%nTotal:   %d%n%n",
                    a.brancos(), a.nulos(), a.total()));
        }
        return sb.toString();
    }
}
