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
        <h4 class="firma_title"><?php echo esc_html($firma_title); ?>
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

    <div class="application-form">
      <h3 data-i18n="jetzt_bewerben">Jetzt bewerben</h3>
      <?php
      $post_type = get_post_type();
      $post_type_object = get_post_type_object($post_type);
      $post_type_label = $post_type_object->labels->name;


      if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        $apiKey  = 'bddf5e7deed83143038488bfebdbc394-667818f5-8d43372f';        // Dein privater API Key (z. B. "key-1234567890abcdef")
        $domain  = 'bewerbung.diekvlehre.ch';       // Deine verifizierte Mailgun-Domain
        $apiUrl  = "https://api.eu.mailgun.net/v3/$domain/messages";

        $nachname = isset($_POST['nachname']) ? sanitize_text_field($_POST['nachname']) : '';
        $vorname  = isset($_POST['vorname']) ? sanitize_text_field($_POST['vorname']) : '';
        $adresse  = isset($_POST['adresse']) ? sanitize_text_field($_POST['adresse']) : '';
        $plz      = isset($_POST['plz']) ? sanitize_text_field($_POST['plz']) : '';
        $ort      = isset($_POST['ort']) ? sanitize_text_field($_POST['ort']) : '';
        $tel      = isset($_POST['tel']) ? sanitize_text_field($_POST['tel']) : '';
        $email    = isset($_POST['email']) ? sanitize_email($_POST['email']) : '';


        $firma_title        = get_field('firma');
        $lehrstelle_1_titel = get_field('lehrstelle_1')['titel'];
        $lehrstelle_1_jahr  = get_field('lehrstelle_1')['jahr'];
        $lehrstelle_2_titel = get_field('lehrstelle_2')['titel'];
        $lehrstelle_2_jahr  = get_field('lehrstelle_2')['jahr'];

        $html_body = '<html><body>';
        $html_body .= '<h2>Neue Lehrstelle-Bewerbung</h2>';

        $html_body .= '<table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">';
        $html_body .= "<tr><td>Firma</td><td>$firma_title</td></tr>";
        $html_body .= "<tr><td>Region</td><td>$post_type_label</td></tr>";
        $html_body .= "<tr><td>Lehrstelle</td><td>$lehrstelle_1_titel ($lehrstelle_1_jahr)</td></tr>";

        if (!empty($lehrstelle_2_titel)) {
          $html_body .= "<tr><td>Lehrstelle 2</td><td>$lehrstelle_2_titel ($lehrstelle_2_jahr)</td></tr>";
        }
        $html_body .= '</table>';

        $html_body .= '<h3>Bewerbung von:</h3>';
        $html_body .= '<table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse; width: 100%;">';
        $html_body .= "<tr><td>Nachname</td><td>$nachname</td></tr>";
        $html_body .= "<tr><td>Vorname</td><td>$vorname</td></tr>";
        $html_body .= "<tr><td>Adresse</td><td>$adresse</td></tr>";
        $html_body .= "<tr><td>PLZ</td><td>$plz</td></tr>";
        $html_body .= "<tr><td>Ort</td><td>$ort</td></tr>";
        $html_body .= "<tr><td>Telefonnummer</td><td>$tel</td></tr>";
        $html_body .= "<tr><td>E-Mail</td><td>$email</td></tr>";
        $html_body .= '</table>';
        $html_body .= '</body></html>';
        $postFields = [
          'from'    => 'Bewerbung DieKvLehre <bewerbung@diekvlehre.ch>',
          'to'      => 'benjamin.brodwolf@outlook.com',
          'subject' => 'Neue Bewerbung von DieKvLehre.ch',
          'html'    => $html_body,
        ];

        $fileKeys = ['lebenslauf', 'zeugnisse', 'motivation'];

        $attachIndex = 0;
        foreach ($fileKeys as $file_key) {
          if (!empty($_FILES[$file_key]['tmp_name']) && $_FILES[$file_key]['error'] === UPLOAD_ERR_OK) {

            $tmpFilePath  = $_FILES[$file_key]['tmp_name']; // temporäre Datei
            $originalName = $_FILES[$file_key]['name'];     // Originaldateiname


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

        if (curl_errno($ch)) {
          $error_msg = curl_error($ch);
        }
        curl_close($ch);

        if (!isset($error_msg) && $httpCode >= 200 && $httpCode < 300) {
          echo '<p>Danke! Ihre Bewerbung wurde gesendet.</p>';
        } else {
          echo '<p>Beim Versenden Ihrer Bewerbung ist ein Fehler aufgetreten.</p>';
          if (isset($error_msg)) {
            echo '<p>Fehlermeldung: ' . htmlspecialchars($error_msg) . '</p>';
          } else {
            echo '<p>HTTP-Code: ' . $httpCode . '</p>';
            echo '<pre>' . htmlspecialchars($response) . '</pre>';
          }
        }
      }
      ?>

      <style>
        form {
          max-width: 600px;
          margin: auto;
          padding: 20px;
          border: 2px solid #5a8ea3;
          border-radius: 8px;
        }
        label {
          display: block;
          margin-top: 10px;
          font-weight: bold;
        }
        input.form-control {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #5a8ea3;
          border-radius: 4px;
        }
        button {
          width: 100%;
          padding: 10px;
          background-color: #5a8ea3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 15px;
          font-weight: bold;
        }
        button:hover {
          background-color: #48707f;
        }
        .flex-container {
          display: flex;
          gap: 1rem;
        }
      </style>

      <form method="post" enctype="multipart/form-data">
        <input class="form-control" data-i18n="familyName" name="nachname" autocomplete="family-name" placeholder="Nachname*" required="required" type="text">
        <input class="form-control" data-i18n="surname" name="vorname" autocomplete="given-name" placeholder="Vorname*" required="required" type="text">
        <input class="form-control" data-i18n="adresse" name="adresse" autocomplete="street-address" placeholder="Adresse*" required="required" type="text">
        <div class="flex-container">
          <input class="form-control" name="plz" autocomplete="postal-code" placeholder="PLZ*" required="required" style="min-width: 33%; max-width: 33%;" type="text">
          <input class="form-control" data-i18n="place" name="ort" placeholder="Ort*" required="required" style="flex-grow: 1" type="text">
        </div>
        <input class="form-control" autocomplete="email" name="email" placeholder="E-Mail*" type="email">
        <input class="form-control" data-i18n="tel" autocomplete="tel" name="tel" placeholder="Telefonnummer*" required="required" type="text">
        <label>Lebenslauf <input class="form-control" type="file" name="lebenslauf"></label>
        <label>Zeugnisse <input class="form-control" type="file" name="zeugnisse"></label>
        <label>Motivation <input class="form-control" type="file" name="motivation"></label>
        <button type="submit" name="REQUEST_METHOD" data-i18n="jetzt_bewerben">JETZT BEWERBEN!</button>
      </form>

    </div>
  </div>
</div>
<?php get_footer(); ?>
