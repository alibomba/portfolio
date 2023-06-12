<form id="plany-form">
        <main class="plany">
            <div class="row">
                <label for="wiek">Wiek:</label>
                <input type="text" id="wiek" class="input-orange">
            </div>
            <div class="column">
                <p>Poziom zaawansowania:</p>
                <div class="column-nested">
                    <div class="row">
                        <input type="radio" name="zaawansowanie" id="poczatkujacy" class="radio-orange">
                        <label for="poczatkujacy">Początkujacy</label>
                    </div>
                    <div class="row">
                        <input type="radio" name="zaawansowanie" id="sredniozaawansowany" class="radio-orange">
                        <label for="sredniozaawansowany">Średniozaawansowany</label>
                    </div>
                    <div class="row">
                        <input type="radio" name="zaawansowanie" id="zaawansowany" class="radio-orange">
                        <label for="zaawansowany">Zaawansowany</label>
                    </div>
                </div>
            </div>
            <div class="column">
                <label for="treningi">Liczba treningów w tygodniu:</label>
                <input type="number" min="0" max="7" id="treningi" class="input-orange">
            </div>
            <div class="row">
                <label for="waga">Waga(kg):</label>
                <input type="text" class="input-orange" id="waga">
            </div>
            <div class="row">
                <label for="wzrost">Wzrost(cm):</label>
                <input type="text" class="input-orange" id="wzrost">
            </div>
            <div class="column">
                <p>Cel:</p>
                <div class="column-nested">
                    <div class="row">
                        <input class="radio-orange" type="radio" name="cel" id="redukcja">
                        <label for="redukcja">Redukcja tkanki tłuszczowej</label>
                    </div>
                    <div class="row">
                        <input class="radio-orange" type="radio" name="cel" id="masa">
                        <label for="masa">Masa mięśniowa</label>
                    </div>
                    <div class="row">
                        <input class="radio-orange" type="radio" name="cel" id="wytrzymalosc">
                        <label for="wytrzymalosc">Wytrzymałość</label>
                    </div>
                </div>
            </div>
            <div class="row">
                <label for="email">Adres e-mail:</label>
                <input type="text" class="input-orange" id="email">
            </div>
        </main>
        <input type="submit" value="Prześlij" class="submit-red">
    </form>