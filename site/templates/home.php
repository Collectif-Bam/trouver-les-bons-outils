<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site->title() ?></title>
    
    <link rel="stylesheet" href="<?= url('assets') ?>/style.css">
    <script src="<?= url('assets') ?>/script.js" defer></script>

    <meta property='og:title' content='<?= $site->title() ?>' />
    <meta property='og:type' content='website' />
    <meta property='og:url' content='<?= $site->url() ?>' />
    <meta property='og:image' content='<?php
    if ($site->socialImg()->isNotEmpty()) {
        echo $site->socialImg()->toFile()->url();
    }
    ?>' />
    <meta property='og:description' content='<?= $site->desc() ?>' />
</head>
<body>
    
</body>
</html>