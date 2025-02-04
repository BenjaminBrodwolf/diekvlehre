<!doctype html>
<html class="no-js" lang="de">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1" name="viewport">
  <title>SPEDLOGSWISS die Kv-Lehre</title>
  <meta
    content="Starte jetzt Deine Karriere! Finde deine passende KV-Lehrstelle in einer der vier Ausbildungsregionen und bewirb dich im Anschluss hier direkt."
    name="description"

  <link href="<?php echo get_template_directory_uri(); ?>/css/normalize.css" rel="stylesheet" type="text/css">
  <link href="<?php echo get_template_directory_uri(); ?>/css/main.css" rel="stylesheet" type="text/css">
  <link href="<?php echo get_template_directory_uri(); ?>/css/style.css" rel="stylesheet" type="text/css">
  <link href="<?php echo get_template_directory_uri(); ?>/css/header.css" rel="stylesheet" type="text/css">
  <link href="<?php echo get_template_directory_uri(); ?>/css/a2hs.css" rel="stylesheet" type="text/css">
  <?php if (is_single()): ?>
    <link href="<?php echo get_template_directory_uri(); ?>/css/single.css" rel="stylesheet" type="text/css">
  <?php endif; ?>

  <script src="<?php echo get_template_directory_uri(); ?>/js/i18n.js" type="module"></script>
  <script src="<?php echo get_template_directory_uri(); ?>/js/trackingService.js" type="module"></script>

  <script>(function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start':
          new Date().getTime(), event: 'gtm.js'
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src =
        'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-NKZH89KC');</script>
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M51DR51S5K"></script>
  <noscript>
    <iframe height="0"
            src="https://www.googletagmanager.com/ns.html?id=GTM-NKZH89KC" style="display:none;visibility:hidden"
            width="0"></iframe>
  </noscript>

</head>

<body data-active-page-id="">
<?php if (is_single()): ?>

  <header>
    <div class="header-logo">

          <img style="margin-top: 19px;padding-right: 10px;" alt="SpedLogSwiss Logo" height="20" src="<?php echo get_template_directory_uri(); ?>/img/logo.svg"
               width="200">

    </div>
    <div class="header-navs-area">
      <div class="header-nav header-id-0 header-start" data-i18n="start">START</div>
      <div class="header-nav header-id-1 header-application" data-i18n="schnuppern">SCHNUPPERN</div>
      <div class="header-nav header-id-2 header-application active" data-i18n="bewerbung">BEWERBUNG</div>
      <div class="header-nav header-id-3 header-education" data-i18n="ausbildung">AUSBILDUNG</div>
      <div class="header-nav header-id-4 header-movie" data-i18n="film">FILM</div>
      <div class="header-nav header-id-5 header-contact" data-i18n="kontakt">KONTAKT</div>
    </div>


<?php else: ?>


<header>
  <div class="header-logo">
    <div class="turnaround">
      <div class="front">
        <img alt="SpedLogSwiss Logo" height="20" src="<?php echo get_template_directory_uri(); ?>/img/logo.svg"
             width="200">
      </div>
      <div class="back">
        <div class="header-bewerb-dich" data-i18n="bewirb_dich_jetzt">BEWIRB DICH JETZT!</div>
      </div>
    </div>
  </div>
  <div class="header-navs-area">
    <div class="header-nav header-id-0 header-start active" data-i18n="start">START</div>
    <div class="header-nav header-id-1 header-application" data-i18n="schnuppern">SCHNUPPERN</div>
    <div class="header-nav header-id-2 header-application" data-i18n="bewerbung">BEWERBUNG</div>
    <div class="header-nav header-id-3 header-education" data-i18n="ausbildung">AUSBILDUNG</div>
    <div class="header-nav header-id-4 header-movie" data-i18n="film">FILM</div>
    <div class="header-nav header-id-5 header-contact" data-i18n="kontakt">KONTAKT</div>
  </div>


<?php endif; ?>
  <div class="header-languages">
    <span class="langDE" data-lang="de">DE</span> |
    <span class="langFR" data-lang="fr">FR</span> |
    <span class="langIT" data-lang="it">IT</span>
  </div>
  <div class="hamburger">
    <input class="checkbox" id="" name="" type="checkbox"/>
    <div class="hamburger-lines">
      <span class="line line1"></span>
      <span class="line line2"></span>
      <span class="line line3"></span>
    </div>
    <div class="sidebar">
      <div class="mobileSidebarMenu">
        <div class="sidebar-nav header-id-1 active" data-i18n="schnuppern">SCHNUPPERN</div>
        <div class="sidebar-nav header-id-2" data-i18n="bewerbung">BEWERBUNG</div>
        <div class="sidebar-nav header-id-3" data-i18n="ausbildung">AUSBILDUNG</div>
        <div class="sidebar-nav header-id-4" data-i18n="film">FILM</div>
        <div class="sidebar-nav header-id-5" data-i18n="kontakt">KONTAKT</div>
        <hr>
      </div>
      <img alt="SpedLogSwiss Logo" height="20" src="<?php echo get_template_directory_uri(); ?>/img/logo.svg"
           width="200">
      <p>Elisabethenstrasse 44<br>4051 Basel</p>
      <p>
        <a class="bold" href="tel:+41612059800">+41 61 205 98 00</a>
        <br>
        <a class="bold" href="tel:+41612059801">+41 61 205 98 01</a>
      </p>
      <a class="bold" href="mailto:grundbildung@spedlogswiss.com">grundbildung@spedlogswiss.com</a>
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
      <hr class="installBtnLine"/>
      <button id="installAppBtn" type="button">Als WebApp installieren</button>
      <hr/>
      <a data-i18n="datenschutz" href="datenschutz.html" style="margin-bottom: 0.75rem" target="_blank">Datenschutzerklärung</a><br>
      <a href="impressum.html" target="_blank">Impressum</a>
    </div>
  </div>

</header>
