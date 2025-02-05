<?php
/*
Template Name: Lehrstelle

*/
get_header();

// Hole die ID aus der URL
$post_id = get_the_ID();

// Beitrag abrufen
$post = get_post($post_id);

if (!$post_id) {
  echo '<p>Firma nicht gefunden.</p>';
  exit;
}

// Hole die ACF-Felder
$firma_title = get_field('firma');
$firma_logo = get_field('logo');
$firma_logo_url = get_field('logo_url');
$lehrstelle_1_titel = get_field('lehrstelle_1')['titel'];
$lehrstelle_1_jahr = get_field('lehrstelle_1')['jahr'];
$lehrstelle_2_titel = get_field('lehrstelle_2')['titel'];
$lehrstelle_2_jahr = get_field('lehrstelle_2')['jahr'];
$lehrstellenbeschreibung = get_field('lehrstellenbeschreibung');
$kontaktperson = get_field('kontaktperson');
$telefon = get_field('telefon');
$mail = get_field('e-mail');

$post_type = get_post_type();
$post_type_object = get_post_type_object($post_type);
$post_region = $post_type_object->labels->name;
?>
<div class="application-page">

  <div class="application-content">
    <h2 data-i18n="bewerbung">BEWERBUNG</h2>
    <div class="application-banner">
      <div class="firma">
        <?php if ($firma_logo) : ?>
          <img src="<?php echo esc_url($firma_logo); ?>" alt="Firmenlogo">
        <?php elseif ($firma_logo_url) : ?>
          <img src="<?php echo $firma_logo_url; ?>" alt="Firmenlogo">
        <?php else : ?>
          <span>Kein Logo verfügbar</span>
        <?php endif; ?>
        <h4 class="firma_title"><?php echo esc_html($firma_title); ?> (<?php echo esc_html($post_region); ?>)</h4>
      </div>
      <div class="application-offer_1 application-offer_title"><?php echo esc_html($lehrstelle_1_titel); ?></div>
      <div class="application-offer_1 application-offer_year"><?php echo esc_html($lehrstelle_1_jahr); ?></div>
      <?php if ($lehrstelle_2_titel) : ?>
        <div class="application-offer_2 application-offer_title"><?php echo esc_html($lehrstelle_2_titel); ?></div>
        <div class="application-offer_2 application-offer_year"><?php echo esc_html($lehrstelle_2_jahr); ?></div>
      <?php endif; ?>
    </div>

    <h3 data-i18n="lehrstellenbeschreibung">Lehrstellenbeschreibung</h3>
    <div class="application-description">
      <?php echo wp_kses_post($lehrstellenbeschreibung); ?>
    </div>

    <h3>Kontaktperson</h3>
    <div class="contact_person">
      <h3><?php echo esc_html($kontaktperson); ?></h3>
      <?php if ($mail) : ?>
        <p>
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm16 2H6l6 5.25L18 6zm-12 1v10h12V7l-6 5.25L6 7z"/>
          </svg>
          <a href="mailto:<?php echo esc_html($mail); ?>"><?php echo esc_html($mail); ?></a>
        </p>  <?php endif; ?>
      <?php if ($telefon) : ?>
        <p>
          <svg class="icon" viewBox="0 0 24 24">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.24 11.36 11.36 0 003.58.57 1 1 0 011 1V21a1 1 0 01-1 1A19 19 0 013 5a1 1 0 011-1h3.25a1 1 0 011 1 11.36 11.36 0 00.57 3.58 1 1 0 01-.24 1.11z"/>
          </svg>
          <a href="tel:<?php echo esc_html($telefon); ?>"><?php echo esc_html($telefon); ?></a>
        </p> <?php endif; ?>
    </div>

    <?php
    $showForm = true; // Standard: Formular anzeigen
    $message = '';

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {

      $apiKey = 'bddf5e7deed83143038488bfebdbc394-667818f5-8d43372f';
      $domain = 'bewerbung.diekvlehre.ch';
      $apiUrl = "https://api.eu.mailgun.net/v3/$domain/messages";

      $nachname = isset($_POST['nachname']) ? sanitize_text_field($_POST['nachname']) : '';
      $vorname = isset($_POST['vorname']) ? sanitize_text_field($_POST['vorname']) : '';
      $adresse = isset($_POST['adresse']) ? sanitize_text_field($_POST['adresse']) : '';
      $plz = isset($_POST['plz']) ? sanitize_text_field($_POST['plz']) : '';
      $ort = isset($_POST['ort']) ? sanitize_text_field($_POST['ort']) : '';
      $tel = isset($_POST['tel']) ? sanitize_text_field($_POST['tel']) : '';
      $email = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';

      $firma_title = get_field('firma');
      $lehrstelle_1_titel = get_field('lehrstelle_1')['titel'];
      $lehrstelle_1_jahr = get_field('lehrstelle_1')['jahr'];
      $lehrstelle_2_titel = get_field('lehrstelle_2')['titel'] ?? '';
      $lehrstelle_2_jahr = get_field('lehrstelle_2')['jahr'] ?? '';

      $html_body = "<html><body>";
      $html_body .= "<h2>Neue Lehrstelle-Bewerbung</h2>";
      $html_body .= "<table border='1' cellspacing='0' cellpadding='8' style='border-collapse: collapse; width: 100%;'>";
      $html_body .= "<tr><td>Firma</td><td>$firma_title</td></tr>";
      $html_body .= "<tr><td>Region</td><td>$post_region</td></tr>";
      $html_body .= "<tr><td>Lehrstelle</td><td>$lehrstelle_1_titel ($lehrstelle_1_jahr)</td></tr>";

      if (!empty($lehrstelle_2_titel)) {
        $html_body .= "<tr><td>Lehrstelle 2</td><td>$lehrstelle_2_titel ($lehrstelle_2_jahr)</td></tr>";
      }
      $html_body .= "</table>";

      $html_body .= "<h3>Bewerbung von:</h3>";
      $html_body .= "<table border='1' cellspacing='0' cellpadding='8' style='border-collapse: collapse; width: 100%;'>";
      $html_body .= "<tr><td>Nachname</td><td>$nachname</td></tr>";
      $html_body .= "<tr><td>Vorname</td><td>$vorname</td></tr>";
      $html_body .= "<tr><td>Adresse</td><td>$adresse</td></tr>";
      $html_body .= "<tr><td>PLZ</td><td>$plz</td></tr>";
      $html_body .= "<tr><td>Ort</td><td>$ort</td></tr>";
      $html_body .= "<tr><td>Telefonnummer</td><td>$tel</td></tr>";
      $html_body .= "<tr><td>E-Mail</td><td>$email</td></tr>";
      $html_body .= "</table></body></html>";

      $postFields = [
        'from' => 'Bewerbung DieKvLehre <bewerbung@diekvlehre.ch>',
        'to' => 'benjamin.brodwolf@outlook.com',
        'subject' => 'Neue Bewerbung von DieKvLehre.ch',
        'html' => $html_body,
      ];

      $fileKeys = ['lebenslauf', 'zeugnisse', 'motivation'];
      $attachIndex = 0;

      foreach ($fileKeys as $file_key) {
        if (!empty($_FILES[$file_key]['tmp_name']) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {
          $tmpFilePath = $_FILES[$file_key]['tmp_name'];
          $originalName = $_FILES[$file_key]['name'];

          $cFile = curl_file_create($tmpFilePath, null, $file_key . '_' . $originalName);
          $postFields["attachment[$attachIndex]"] = $cFile;
          $attachIndex++;
        }
      }

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_USERPWD, 'api:' . $apiKey);
      curl_setopt($ch, CURLOPT_URL, $apiUrl);
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

      $response = curl_exec($ch);
      $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
      $error_msg = curl_errno($ch) ? curl_error($ch) : '';

      curl_close($ch);

      if (empty($error_msg) && $httpCode >= 200 && $httpCode < 300) {
        $showForm = false;
        $message = '<h3>Vielen Dank für Ihre Bewerbung!</h3><br><p>Wir haben Ihnen eine Bestätigungs-E-Mail an die angegebene E-Mail-
Adresse gesendet und melden uns in Kürze bei Ihnen.</p>';
      } else {
        $message = '<p class="error">Beim Versenden Ihrer Bewerbung ist ein Fehler aufgetreten.</p>';
        if (!empty($error_msg)) {
          $message .= '<p>Fehlermeldung: ' . htmlspecialchars($error_msg) . '</p>';
        } else {
          $message .= '<p>HTTP-Code: ' . $httpCode . '</p>';
          $message .= '<pre>' . htmlspecialchars($response) . '</pre>';
        }
      }
    }
    ?>

    <?php if ($showForm): ?>
      <?= $message; ?>
      <div class="application-form">
        <h3 data-i18n="jetzt_bewerben">Jetzt bewerben</h3>
        <form method="post" enctype="multipart/form-data">
          <div class="flex-container">
            <input class="form-control" name="nachname" placeholder="Nachname*" required type="text">
            <input class="form-control" name="vorname" placeholder="Vorname*" required type="text">
          </div>
          <input class="form-control" name="adresse" placeholder="Adresse*" required type="text">
          <div class="flex-container">
            <input class="form-control" name="plz" placeholder="PLZ*" required style="min-width: 33%;" type="text">
            <input class="form-control" name="ort" placeholder="Ort*" required style="flex-grow: 1" type="text">
          </div>
          <div class="flex-container">
            <input class="form-control" name="email" placeholder="E-Mail*" type="email">
            <input class="form-control" name="tel" placeholder="Telefonnummer*" required type="text">
          </div>
          <h3 style="margin-top: 2rem">Upload</h3>
          <label class="file-input-wrapper">
          <span class="file-content-wrapper">
          <span class="file-icon">+</span>
          <span class="file-label">Lebenslauf</span>
          <input type="file" name="lebenslauf" accept=".pdf,.doc,.docx" onchange="updateFileName(this)">
          <span class="file-name" id="lebenslauf-name"></span>
              </span>
          </label>

          <label class="file-input-wrapper">
         <span class="file-content-wrapper">
          <span class="file-icon">+</span>
          <span class="file-label">Zeugnisse</span>
          <input type="file" name="zeugnisse" accept=".pdf,.doc,.docx" onchange="updateFileName(this)">
          <span class="file-name" id="zeugnisse-name"></span>
        </span>
          </label>

          <label class="file-input-wrapper">
           <span class="file-content-wrapper">
          <span class="file-icon">+</span>
          <span class="file-label">Motivation</span>
          <input type="file" name="motivation" accept=".pdf,.doc,.docx" onchange="updateFileName(this)">
          <span class="file-name" id="motivation-name"></span>
           </span>
          </label>
          <button type="submit">JETZT BEWERBEN!</button>
        </form>
      </div>
    <?php else: ?>
      <div style="border: 3px solid white;
      margin-inline: auto; max-width: 600px;
      padding: 1rem;  margin-top: 3rem;
    text-align: center;">
        <?= $message; ?>
      </div>
    <?php endif; ?>

    <script>
      const allowedExtensions = ['pdf', 'doc', 'docx'];
      function updateFileName(input) {
        const file = input.files[0];
        if (file) {
          const fileExtension = file.name.split('.').pop().toLowerCase();
          if (!allowedExtensions.includes(fileExtension)) {
            alert('Nur PDF- und Word-Dokumente (.pdf, .doc, .docx) sind erlaubt.');
            input.value = ''; // Löscht die ungültige Datei
          } else {
            let fileName = input.files.length > 0 ? input.files[0].name : '';
            let fileLabel = input.nextElementSibling;
            fileLabel.textContent = fileName;
          }
        }
      }
    </script>


  </div>
</div>
</div>
<?php get_footer(); ?>
