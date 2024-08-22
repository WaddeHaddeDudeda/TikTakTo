const felder = document.querySelectorAll(".feld");//alle felder werden aufgerufen(querySelectorAll)
const text_status = document.querySelector("#text_status");//hier wird die <h2>, die spielsituation wiedergegeben(querySelector)
const restart_button = document.querySelector("#restart_button");
const win_möglichkeiten = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let zustand = ["", "", "", "", "", "", "", "", ""];
let spieler = "X";
let runing = false;
spiel_laden();//funktion "spiel_laden" aufgerufen

function spiel_laden() {
    felder.forEach(feld => feld.addEventListener("click", feld_geklickt));//.forEch schleife das man in jedes feld klicken kann
    restart_button.addEventListener("click", restarte_das_game);
    text_status.textContent = `Spieler ${spieler} ist an der Reihe`;
    runing = true;
}

function feld_geklickt(e) {//e=Event-Objekt
    const feld_index = this.getAttribute("feld_index");
    if (zustand[feld_index] !== "" || !runing) {
        return;//beendet wenn nicht mehr läuft || "" bereits alle belegt sind
    }
    update_feld(this, feld_index);
    gewinner_ermitteln();
}

function update_feld(feld, index) {//parameter feld(aus html entnommen), index(hilft welches feld aktualisiert werden soll)
    zustand[index] = spieler;
    feld.textContent = spieler;
}

function spieler_wechsel() {
    spieler = (spieler === "X" ? "O" : "X"); //geprüft 
    text_status.textContent = `Spieler ${spieler} ist an der Reihe`;
} 

function spieler_punkte(spieler) {
    const punkte_stand = document.getElementById(`score_${spieler}`);
    let aktuelle_punkte = parseInt(punkte_stand.textContent);//string wird in Zahl umgewandelt
    aktuelle_punkte++;
    punkte_stand.textContent = aktuelle_punkte;
}

// andere idee gehabt mit if anweisung statt for schleife
function gewinner_ermitteln() {
    let runde_gewonnen = false;     //i wird solange ausgeführt bis kein win möglichkeiten mehr sind
    for (let i = 0; i < win_möglichkeiten.length; i++) {
        const bedingungen = win_möglichkeiten[i];
        const feldA = zustand[bedingungen[0]];//zustan=9xfelder
        const feldB = zustand[bedingungen[1]];//bedingung=alle win-möglichkeiten
        const feldC = zustand[bedingungen[2]];//Felder A-C stehen für die Kombination, die man braucht um zu gewinnen
        if (feldA === "" || feldB === "" || feldC === "") {
            continue;
        }
        if (feldA === feldB && feldB === feldC) {
            runde_gewonnen = true;
            break;
        }
    }
    if (runde_gewonnen) {
        text_status.textContent = `Der Spieler ${spieler} hat gewonnen`;
        spieler_punkte(spieler);
        runing = false;
    } else if (!zustand.includes("")) {//alle felder belegt? dann unentschieden
        text_status.textContent = `Unentschieden`;
        runing = false;
    } else {
        spieler_wechsel();
    }
}

function restarte_das_game(e) {
    spieler = "X";
    zustand = ["", "", "", "", "", "", "", "", ""];
    text_status.textContent = `Spieler ${spieler} ist an der Reihe`;
    felder.forEach(feld => feld.textContent = "");
    runing = true;
}