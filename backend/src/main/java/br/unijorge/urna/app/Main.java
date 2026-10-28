package br.unijorge.urna.app;

import br.unijorge.urna.repository.RepositorioFactory;
import br.unijorge.urna.repository.VotoRepository;
import br.unijorge.urna.service.CatalogoCandidatos;
import br.unijorge.urna.service.UrnaService;
import br.unijorge.urna.view.UrnaFrame;

import javax.swing.SwingUtilities;
import javax.swing.UIManager;

public class Main {
    public static void main(String[] args) {
        VotoRepository repository = RepositorioFactory.criar();
        UrnaService service = new UrnaService(repository, new CatalogoCandidatos());

        SwingUtilities.invokeLater(() -> {
            try {
                UIManager.setLookAndFeel(UIManager.getCrossPlatformLookAndFeelClassName());
            } catch (Exception ignored) {
            }
            new UrnaFrame(service).setVisible(true);
        });
    }
}
