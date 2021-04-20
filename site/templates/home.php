<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site->title() ?></title>
    
    <link rel="stylesheet" href="<?= url('assets') ?>/css/style.css">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"> 
    <script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js" defer></script>
    <script src="<?= url('assets') ?>/js/script.js" defer></script>

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
    <div id="app">
        <header class="header">
            <button class="header__search"></button>
            <button class="header__selection"></button>
        </header>
        
        <div class="tools">
        <?php foreach($site->children()->listed() as $tool): ?>
            <section class="tool">
                <header class="tool__header">
                    <h1><?= $tool->title() ?></h1>
                </header>
                <div class="tool__summary summary">
                    <h2><?= $tool->fonction() ?></h2>
                    <p><?= $tool->summary() ?></p>
                    <ul class="summary__tags">
                        <?php foreach($tool->tags()->split() as $tag): ?>
                            <?php if ($tag): ?>
                                <li><?= $tag ?></li>
                            <?php endif ?>
                        <?php endforeach ?>
                    </ul>
                </div>
            </section>
        <?php endforeach ?>
        </div>
    </div>

</body>
</html>