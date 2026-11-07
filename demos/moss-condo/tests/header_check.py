# Importa o navegador automatizado e as verificações de elementos visíveis.
from playwright.sync_api import sync_playwright, expect
# Inicia uma sessão isolada para conferir os controles do cabeçalho.
with sync_playwright() as playwright:
    # Reaproveita o Chrome instalado sem alterar configurações do computador.
    browser = playwright.chromium.launch(channel='chrome')
    # Abre uma aba exclusiva para os testes de largura.
    page = browser.new_page()
    # Confere os três perfis porque cada um apresenta iniciais e nome diferentes.
    for profile, initials in [('sindico', 'AS'), ('morador', 'ME'), ('portaria', 'PT')]:
        # Inclui larguras pequenas e intermediárias semelhantes às obtidas ao ampliar o navegador.
        for width in [280, 320, 390, 600, 601, 768, 900, 1024, 1201, 1280, 1440]:
            # Define a largura do cenário mantendo uma altura suficiente para a interface.
            page.set_viewport_size({'width': width, 'height': 900})
            # Abre o perfil no servidor local que o usuário está avaliando.
            page.goto(f'http://127.0.0.1:5196/#/{profile}/painel')
            # Aguarda a montagem do painel antes de medir o cabeçalho.
            expect(page.locator('main h1')).to_be_visible()
            # Confere que o nome do perfil permanece visível e selecionável.
            expect(page.get_by_label('Trocar perfil demonstrativo', exact=True)).to_be_visible()
            # Mede a margem direita do seletor e verifica a ausência de corte em seus controles.
            assert page.locator('.condo-profile-select select').evaluate('element => { const box = element.getBoundingClientRect(); return box.left >= 0 && box.right <= innerWidth - 8; }'), (profile, width, 'seletor cortado')
            # Verifica o avatar nas larguras em que o desenho deve aparecer.
            if width > 600:
                # Confere que as iniciais correspondem ao perfil atual.
                expect(page.locator('.condo-avatar')).to_have_text(initials)
                # Confere o tamanho do círculo e seu respiro até a borda da janela.
                assert page.locator('.condo-avatar').evaluate('element => { const box = element.getBoundingClientRect(); return box.width >= 35 && box.height >= 35 && box.right <= innerWidth - 8; }'), (profile, width, 'avatar comprimido ou cortado')
                # Mede também as próprias letras, não somente a caixa do círculo.
                assert page.locator('.condo-avatar').evaluate('element => { const range = document.createRange(); range.selectNodeContents(element); const text = range.getBoundingClientRect(); const box = element.getBoundingClientRect(); return text.left >= box.left && text.right <= box.right && text.top >= box.top && text.bottom <= box.bottom; }'), (profile, width, 'iniciais fora do círculo')
            # Confere o comportamento móvel aprovado, que omite apenas o avatar decorativo.
            else:
                # Mantém o seletor disponível enquanto o avatar permanece oculto no celular.
                expect(page.locator('.condo-avatar')).to_be_hidden()
    # Fecha o navegador depois de todos os cenários.
    browser.close()
# Confirma o resultado dos 33 cenários efetivamente executados.
print('OK: cabeçalho em 3 perfis e 11 larguras; seletor visível, avatar sem compressão e iniciais dentro do círculo.')
