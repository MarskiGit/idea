Projekt i wykonawca:

Mariusz Kępski


https://github.com/MarskiGit/idea.git

Ambitny projekt do szuflady.

Wzorzec projektowy MVC.

Zasady projektu:

    Kod musi być konserwowalny.
    Rzetelny i niezawodny.
    Użyteczny i wydajny.
    Odporny.
    Przejrzysty i czytelny.
    Bez zbędnych elementów.

Założenia:

Asynchroniczne ładowanie treści w poszczególnych zakładkach wykonywane tylko za pomocą JavaScript.
Akcje zmiany zakładek obsługiwane za pomocą żądania GET.
Obsługa kont użytkowników w AJAX.

BRAK OBSŁUGI POST PO STRONIE SERWERA TYM ZAJMUJE SIĘ AJAX

Zapytanie AJAX odbywa się bezpośrednio do modelu, pomijając zbędną drogę kontroli żądania.

Wzapytania musi być okreslona wartość w obiekcie {action: }