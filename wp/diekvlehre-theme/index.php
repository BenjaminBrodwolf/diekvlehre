<?php /* Template Name: index */ ?>

<?php
get_header();

// Lade Regionendaten
require_once 'php/region-data.php';
$region_data = get_region_data();
?>
<main class="pages">

  <section class="contact" data-page-id="5">
    <div class="topLeft">
      <div class="topText"><h2 data-i18n="contact.left.headline">Du hast Fragen? Transportier sie zu uns.</h2>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg fill="#ffffff" viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
      <div class="bottomText">
        <h4 data-i18n="contact.left.subline">Dir ist noch nicht alles ganz klar? Im Frachter deiner Gedanken
          gibt es noch Unsicherheiten? Dann nimm doch einfach Kontakt mit uns auf und wir beantworten dir alle
          Fragen rund um die Branche und deine Ausbildung.
        </h4>
      </div>

    </div>
    <div class="bottomRight">
      <div class="bottomRightContent">
        <h2 data-i18n="contact.right.headline">Unsere Kontaktdaten für all deine Anliegen.</h2>
        <p><span data-i18n="contact.right.tel">Du erreichst uns telefonisch unter</span><br>
          <a class="bold" href="tel:+41612059800" style="color: white;">+41 61 205 98 00</a></p>

        <p><span data-i18n="contact.right.mail">Schreib uns vielleicht eine Mail?</span><br>
          <a class="bold"
             href="mailto:grundbildung@spedlogswiss.com" style="color: white;">grundbildung@spedlogswiss.com</a>
        </p>

        <p data-i18n="contact.right.social_media">Oder besuche uns auf einem unserer Social Media-Kanäle:</p>
        <div class="social-media">
          <a href="https://www.linkedin.com/company/spedlogswiss/" target="_blank">
            <svg viewBox="0 0 27.65 27.65">
              <use href="#svgLinkedin"/>
            </svg>
          </a>
          <a href="https://www.youtube.com/@spedlogswiss6989" target="_blank">
            <svg viewBox="0 0 27.65 27.65">
              <use href="#svgYoutube"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/SPEDLOGSWISS" target="_blank">
            <svg viewBox="0 0 27.65 27.65">
              <use href="#svgFacebook"/>
            </svg>
          </a>
          <a href="https://www.instagram.com/diekvlehre.ch/" target="_blank">
            <svg viewBox="0 0 27.65 27.65">
              <use href="#svgInsta"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="movie" data-page-id="4">
    <div class="topLeft">
      <div class="topText"><h2 data-i18n="movie.left.headline">Du magst es bewegt? Fahr unseren Film ab.</h2>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg fill="#ffffff" viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
      <div class="bottomText">
        <h4 data-i18n="movie.left.subline">Schau dir unseren Film mit 7 guten Gründen für deine Ausbildung bei
          einem Speditions- und Logistikunternehmen an.
        </h4>
      </div>
    </div>
    <div class="bottomRight">
      <div class="bottomRightContent">
        <h2 data-i18n="movie.right.headline">Wir überzeugen dich auch visuell.</h2>
        <h3 data-i18n="movie.right.subline">Suchst du noch ein paar Argumente für eine Ausbildung voll guter
          Connections? </h3>
        <hr/>
        <p data-i18n="movie.right.copy" style="margin-bottom: 0">In diesem kleinen Film erfährst du alles, was
          du hierzu wissen musst – und sammelst in jeder Sekunde noch mehr gute Gründe für deine Ausbildung in
          der Speditions- und Logistikbranche.</p>
        <div style="margin-bottom: 0.5rem"><i data-i18n="movie.right.start">3, 2, 1 … Film ab!</i></div>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="movieIframe movieDE"
          enablejsapi=”true”
          frameborder="0"
          height="450" src="https://www.youtube.com/embed/J1CPE_d1ApU?enablejsapi=1"
          title="Spedlogswiss - 7 Gute Gründe für eine Lehre als Speditionskauffrau/mann"
          width="100%"></iframe>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="movieIframe movieFR"
          enablejsapi=”true”
          frameborder="0"
          height="450" src="https://www.youtube.com/embed/5FBlgOqbjGk?enablejsapi=1"
          title="Spedlogswiss - 7 Bonnes Raisons d'effectuer un apprentissage d'employé(e) de commerce CFC Branche Logistique et Transports Internationaux"
          width="100%"></iframe>
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
          class="movieIframe movieIT"
          enablejsapi=”true”
          frameborder="0"
          height="450" src="https://www.youtube.com/embed/kZ6GMvx5sMU?enablejsapi=1"
          title="Spedlogswiss - 7 Buoni Motivi per un apprendistato di Impiegato/a di commercio Logistica e trasporti internazionali (AFC)"
          width="100%"></iframe>
        <div class="centerDiv">
          <button data-i18n="jetzt_bewerben" type="button">JETZT BEWERBEN!</button>
        </div>
      </div>
    </div>
  </section>

  <section class="education" data-page-id="3">
    <div class="topLeft">
      <div class="topText">
        <h2 data-i18n="education.left.headline">Deine Ausbildung? Vollgepackt mit Inhalten.</h2>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg fill="#ffffff" viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
      <div class="bottomText">
        <h4 data-i18n="education.left.subline">Entdecke deine Möglichkeiten in der Speditions- und
          Logistikbranche mit einer kaufmännischen Ausbildung.</h4>
      </div>

    </div>
    <div class="bottomRight">
      <div class="bottomRightContent">
        <h2 data-i18n="education.right.headline">Drei Möglichkeiten für deine Zukunft.</h2>
        <h3 data-i18n="education.right.subline">Wie möchtest du die Welt bewegen?</h3>
        <hr/>
        <p data-i18n="education.right.copy">In der Speditions- und Logistikbranche unterscheidet man zwischen
          drei unterschiedlichen möglichen
          Ausbildungsberufen. Welche Ausbildung perfekt zu dir passt und was alles Teil der Ausbildungen ist,
          kannst du hier lesen. So viel sei gesagt – da rollen jede Menge Möglichkeiten auf dich zu!</p>

        <div class="educationChoices">
          <div class="efz">
            <div class="buildingImage">
              <svg fill="none" viewBox="0 0 221 135">
                <use href="#svgBuilding2"/>
              </svg>
            </div>
            <div class="educationTitle">
              <p data-i18n="education.efz.headline">In Kontakt mit der ganzen Welt – die Ausbildung
                Kaufmann*frau Internationale Speditionslogistik EFZ
              </p>
            </div>
            <div class="educationBtn">
              <button type="button"><span data-i18n="education.efz">EFZ</span></button>
            </div>
          </div>
          <div class="vl1"></div>
          <div class="eba">
            <div class="buildingImage">
              <svg fill="none" viewBox="0 0 221 135">
                <use href="#svgBuilding1"/>
              </svg>
            </div>
            <div class="educationTitle">
              <p data-i18n="education.eba.headline">
                Das Fundament für deine Karriere – die Grundbildung Kaufmann*frau EBA
              </p>
            </div>
            <div class="educationBtn">
              <button type="button"><span data-i18n="education.eba">EBA</span></button>
            </div>
          </div>
          <div class="vl2"></div>
          <div class="bam">
            <div class="buildingImage">
              <svg fill="none" viewBox="0 0 221 135">
                <use href="#svgBuilding3"/>
              </svg>
            </div>
            <div class="educationTitle">
              <p data-i18n="education.bam.headline">
                Praktisch gebildet – der Branchenabschluss für Mittelschulabsolvent*innen BAM
              </p>
            </div>
            <div class="educationBtn">
              <button type="button"><span data-i18n="education.bam">BAM</span></button>
            </div>
          </div>
        </div>

        <div class="efzContent eduContent">
          <h4 data-i18n="was">Was?</h4>
          <p data-i18n="education.efz.was">Sorg dafür, dass Waren von A nach B kommen: In deiner Ausbildung
            als Kaufmann*frau Internationale
            Speditionslogistik EFZ planst und organisierst du im direkten Austausch mit Kund*innen
            Transportlösungen – so kommen Güter aus aller Welt sicher, pünktlich und effizient ans Ziel.
            Ausserdem lernst du viel über die Wirtschaft in den jeweiligen Ländern, die Zollvorschriften
            sowie die Im- und Exportvorschriften der Schweiz.</p>
          <h4 data-i18n="wie_lange">Wie lange?</h4>
          <p data-i18n="education.efz.wie_lange">Nach drei Jahren schliesst du mit einem eidgenössischen
            Fähigkeitszeugnis (EFZ) ab.</p>
          <h4 data-i18n="education.efz.bringts_mit.0">Du bringst mit:</h4>
          <ul>
            <li><span data-i18n="education.efz.bringts_mit.1">Interesse an kaufmännischen Arbeiten</span>
            </li>
            <li><span
                data-i18n="education.efz.bringts_mit.2">Freude an Zahlen, Computerarbeit undOrganisationstalent </span>
            </li>
            <li>
              <span data-i18n="education.efz.bringts_mit.3">Geografiekenntnisse, Sprachtalent, Kontaktfreude</span>
            </li>
          </ul>
        </div>

        <div class="ebaContent eduContent">
          <h4 data-i18n="was">Was?</h4>
          <p data-i18n="education.eba.was">In deiner beruflichen Grundbildung Kaufmann*frau EBA absolvierst du
            deine Ausbildung über die Branche D&A (Dienstleistung & Administration), während du in einem
            Speditionsunternehmen tätig bist. Im Anschluss daran hast du beispielsweise die Möglichkeit,
            deine Ausbildung mit einer verkürzten Lehre (2 Jahre) als Kaufmann*frau EFZ fortzusetzen oder
            eine Weiterbildung in Richtung Zollwesen zu machen.
          </p>
          <h4 data-i18n="wie_lange">Wie lange?</h4>
          <p data-i18n="education.eba.wie_lange">Nach zwei Jahren schliesst du mit einem eidgenössischen
            Berufsattest (EBA) ab.
          </p>
          <h4 data-i18n="gut_zu_wissen">Gut zu wissen!</h4>
          <p data-i18n="education.eba.gut_zu_wissen">Für Lernende in der gesamten Deutschschweiz bietet die
            SPEDLOGSWISS Nordwestschweiz in Basel Branchenkunde an. Hier besichtigst du die entsprechenden
            Plattformen und erhältst von Fachreferent*innen eine Einführung.
          </p>
        </div>
        <div class="bamContent eduContent">
          <h4 data-i18n="was">Was?</h4>
          <p data-i18n="education.bam.was">BAM ist die Abkürzung für Branchenabschluss für
            Mittelschulabsolvent*innen. In Zusammenarbeit mit den drei Wirtschafts- und Handelsmittelschulen
            bieten wir in der Region Nordwestschweiz hierzu Praktikumsplätze an.
          </p>
          <h4 data-i18n="wie_lange">Wie lange?</h4>
          <p data-i18n="education.bam.wie_lange">Nach einem 18-monatigen Praktikum in der Speditionsbranche
            schliesst du mit einem eidgenössischen Fähigkeitszeugnis (EFZ) sowie einem Branchendiplom ab.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="application" data-page-id="2">
    <div class="topLeft">
      <div class="topText">
        <h2 data-i18n="application.left.headline">Bewirb dich, wo immer du willst.</h2>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg fill="#ffffff" viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
      <div class="bottomText"><h4 data-i18n="application.left.subline">Finde deine Lehrstelle in der passenden
          Region und bewirb dich im Anschluss direkt.</h4>
      </div>

    </div>
    <div class="bottomRight">
      <div class="bottomRightContent">
        <h2 data-i18n="application.right.headline">Wähle zwischen vier Regionen.</h2>
        <h3 data-i18n="application.right.subline">Eine Ausbildung finden – ganz egal, wo du bist?</h3>
        <hr/>
        <p data-i18n="application.right.copy">In den vier Ausbildungsregionen in der Schweiz findet sich
          garantiert auch ein grossartiges
          Unternehmen in deiner Nähe oder an deinem Wunsch-Wohnort. Wähle eine Region aus und finde so den
          Arbeitgeber, bei dem du deine Ausbildung machen wirst.</p>

        <svg viewBox="0 0 752 466">
          <use class="svgMap mapNWS" href="#svgMapNWS"/>
          <use class="svgMap mapOS" href="#svgMapOS"/>
          <use class="svgMap mapTessin" href="#svgMapTessin"/>
          <use class="svgMap mapRomandie" href="#svgMapRomandie"/>
        </svg>
        <h3 class="selectedRegion">
        </h3>
        <table class="hidden">
          <tbody>
          <tr>
            <th><span data-i18n="application.right.firma">Firma</span>
            <th>
              <div class="location_dropdown">
                <input class="location_text-box" data-i18n="application.right.ort" placeholder="Ort"
                       readonly type="text">
                <div class="location_options">
                </div>
              </div>
            </th>
          </tr>
          </tbody>

          <tbody class="row"></tbody>
        </table>
      </div>
    </div>
  </section>

  <section class="sniff" data-page-id="1">
    <div class="topLeft">
      <div class="topText">
        <h2 data-i18n="sniff.left.headline">Halt die Welt in Bewegung.</h2>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
      <div class="bottomText"><h4 data-i18n="sniff.left.subline">Starte einen Schnuppernachmittag als Kaufmann*frau
          Internationale Speditionslogistik.
          Denn da rollen jede Menge Möglichkeiten auf dich zu.</h4>
      </div>
    </div>
    <div class="bottomRight">
      <div class="bottomRightContent">
        <h2 data-i18n="sniff.right.headline">Schnuppern</h2>

        <p data-i18n="sniff.right.copy">Interessiert dich der internationale Transport von Gütern?
          Bist du sprachgewandt und hast gerne Kundenkontakt?<br> Dann melde dich hier an!
        </p>

        <form id="sniffForm">
          <select class="form-control" name="schnuppertag" required>
            <option disabled selected value="" data-i18n="dayAndPlace">Tag und Ort</option>
            <?php
            $schnuppertag_posts = get_posts(array(
              'post_type' => 'schnuppertag',
              'posts_per_page' => -1,
              'orderby' => 'date',
              'order' => 'ASC',
            ));

            foreach ($schnuppertag_posts as $post) {
              $label = get_field('label', $post->ID);
              $disabled = get_field('disabled', $post->ID);

              $value = $post->ID;
              $style = $disabled ? 'style="text-decoration: line-through;"' : '';
              $disabled_attr = $disabled ? 'disabled' : '';

              $label .= $disabled ? " (Ausgebucht)" : "";

              echo "<option value='{$value}' {$disabled_attr} {$style}>{$label}</option>";
            }
            ?>
          </select>

          <input class="form-control" data-i18n="familyName" name="nachname" autocomplete="family-name"
                 placeholder="Nachname*" required type="text">
          <input class="form-control" data-i18n="surname" name="vorname" autocomplete="given-name"
                 placeholder="Vorname*" required type="text">
          <input class="form-control" data-i18n="adresse" name="adresse" autocomplete="street-address"
                 placeholder="Adresse*" required type="text">
          <div style="display: flex; gap: 1rem;">
            <input class="form-control" name="plz" autocomplete="postal-code"
                   placeholder="PLZ*" required
                   style="min-width: 33%; max-width: 33%;" type="text">
            <input class="form-control" data-i18n="place" name="ort"
                   placeholder="Ort*" required
                   style="flex-grow: 1" type="text">
          </div>
          <input class="form-control" autocomplete="email" name="email" placeholder="E-Mail*" required type="email">
          <input class="form-control" data-i18n="tel" autocomplete="tel" name="tel"
                 placeholder="Telefonnummer*" required type="text">
          <input class="form-send-btn" data-i18n="submit_now" type="submit" value="JETZT ANMELDEN!">
        </form>

        <div id="sniffFormMessage" style="margin-top: 1rem;"></div>

        <script>
          document.addEventListener('DOMContentLoaded', () => {
            const sniffForm = document.getElementById('sniffForm');
            const messageContainer = document.getElementById('sniffFormMessage');

            sniffForm.addEventListener('submit', async (event) => {
              event.preventDefault(); // Verhindert das automatische Neuladen

              const apiKey = 'bddf5e7deed83143038488bfebdbc394-667818f5-8d43372f';
              const domain = 'bewerbung.diekvlehre.ch';
              const apiUrl = `https://api.eu.mailgun.net/v3/${domain}/messages`;

              const formData = new FormData(sniffForm);
              const schnuppertagSelect = sniffForm.querySelector('select[name="schnuppertag"]');

              const schnuppertagLabel = schnuppertagSelect.options[
                schnuppertagSelect.selectedIndex
                ].text;

              const nachname = formData.get('nachname');
              const vorname = formData.get('vorname');
              const adresse = formData.get('adresse');
              const plz = formData.get('plz');
              const ort = formData.get('ort');
              const email = formData.get('email');
              const tel = formData.get('tel');

              const message = `
        <p>Es ist eine Schnupper-Anmeldung auf schnupper.diekvlehre.ch eingegangen.</p>
        <hr>
        <table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse; width: 100%;'>
          <tbody>
          <tr><td><strong>Datum/Ort:</strong></td><td>${schnuppertagLabel}</td></tr>
          <tr><td><strong>Nachname:</strong></td><td>${nachname}</td></tr>
          <tr><td><strong>Vorname:</strong></td><td>${vorname}</td></tr>
          <tr><td><strong>Adresse:</strong></td><td>${adresse}</td></tr>
          <tr><td><strong>PLZ:</strong></td><td>${plz}</td></tr>
          <tr><td><strong>Ort:</strong></td><td>${ort}</td></tr>
          <tr><td><strong>E-Mail:</strong></td><td>${email}</td></tr>
          <tr><td><strong>Telefonnummer:</strong></td><td>${tel}</td></tr>
          </tbody>
        </table>
        <hr>
      `;

              const postFields = new URLSearchParams({
                from: 'Schnuppertag Anmeldung <bewerbung@diekvlehre.ch>',
                to: 'benjamin.brodwolf@outlook.com',
                subject: `Neue Schnupper-Anmeldung: ${vorname} ${nachname}`,
                html: message
              });

              console.log(postFields);

              try {
                const response = await fetch(apiUrl, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + btoa('api:' + apiKey)
                  },
                  body: postFields.toString()
                });

                if (!response.ok) {
                  new Error(`Fehler beim Mailversand: ${response.status} ${response.statusText}`);
                }

                // Erfolgsmeldung ausgeben
                messageContainer.innerHTML = `
          <h3 data-i18n="sniff.submittedSuccessMessage" style="color: var(--senfgelb)">
            Deine Anmeldung wurde an Andrea Jauslin weitergeleitet.
          </h3>
        `;
                sniffForm.reset();

              } catch (error) {
                // Fehlermeldung
                console.error(error);
                messageContainer.innerHTML = `
          <h3 data-i18n="sniff.submittedErrorMessage" style="color: var(--rot)">
            Die Anmeldung konnte nicht weitergeleitet werden. Bitte melde dich direkt per E-Mail an
            <a href="mailto:grundbildung@spedlogswiss.com">grundbildung@spedlogswiss.com</a>.
          </h3>
        `;
              }
              sniffForm.style.display = 'none';
            });
          });
        </script>

      </div>
  </section>

  <section class="section-start" data-page-id="0">
    <div class="start-content">
      <div class="startVideo">
        <video autoplay loop muted playsinline poster="<?php echo get_template_directory_uri(); ?>/img/start.webp">
          <source src="<?php echo get_template_directory_uri(); ?>/img/start_animated_points.webm" type="video/webm">
        </video>
      </div>
      <div class="startTitle">
        <h1 data-i18n="start.headline">Mach weltweite Connections.</h1>
        <h3 data-i18n="start.subline">Starte jetzt deine Karriere als Kaufmann*frau EFZ Internationale
          Speditionslogistik.</h3>
      </div>
      <div class="iconsNav">
        <svg class="iconStart" fill="#ffffff" viewBox="0 0 55.26 55.5">
          <use href="#svgStart"/>
        </svg>
        <svg viewBox="0 0 51.01 51.13">
          <use href="#svgBewerbung"/>
        </svg>
        <svg viewBox="0 0 57.37 41.82">
          <use href="#svgAusbildung"/>
        </svg>
        <svg viewBox="0 0 51.97 37.45">
          <use href="#svgMovie"/>
        </svg>
        <svg viewBox="0 0 63.26 39.66">
          <use href="#svgKontakt"/>
        </svg>
      </div>
    </div>
  </section>
</main>

<div class="prevChevron">
  <svg class="chevron chevron-slide-in" viewBox="0 0 63.8 24.7">
    <use href="#svgChevronDown"/>
  </svg>
</div>
<div class="nextChevron">
  <svg class="chevron chevron-slide-in" viewBox="0 0 63.8 24.7">
    <use href="#svgChevronDown"/>
  </svg>
</div>
<script>
  const regionData = <?php echo json_encode($region_data); ?>;
</script>
<script src="<?php echo get_template_directory_uri(); ?>/js/region-handling.js"></script>


<?php get_footer(); ?>
