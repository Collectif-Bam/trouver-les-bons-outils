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
<body data-url="<?= $site->url() ?>">
    <!--========== SEARCH ==========-->

    <div class="search">
        <button class="search__btn">
            <h1>Définir ma recherche</h1>
            <img class="picto dropDown dropDown--close" src="<?= url('assets/pictos') ?>/drop-down.svg" alt="">
        </button>
        
        <div class="search__content">
            <div class="search__wrapper unvisible">
                <h2 class="search__title search__title--filters">Filtres</h2>
                <ul class="search__filters filters">
                    <li class="filters__wrapper">
                        <input class="filters__indicator" type="radio" name="filter">
                        <label for="filter" data-value="all">Tous les outils</label>
                    </li>
                    <li class="filters__wrapper">
                        <input class="filters__indicator" type="radio" name="filter">
                        <label for="filter" data-value="selection">Sélection Osinum</label>
                    </li>
                </ul>
                <div class="filters__wrapper filters__wrapper--selection">
                    <input class="filters__indicator" type="checkbox" name="mobile">
                    <label for="mobile" data-value="mobile">Outils mobiles uniquement</label>
                </div>
                
                <h2 class="search__title search__title--practices">Pratiques</h2>
                <div class="search__list search__list--practices">
                    <?php foreach($site->tagsGroup()->toStructure() as $group): ?>
                        <ul class="search__group group">
                            <li><h3 class="group__title"><?= $group->title() ?></h3></li>
                            <?php foreach($group->tags()->split() as $tag): ?>
                                <li><button class="search__filter --tagBtn"><img class="plus" src="<?= url('assets/pictos') ?>/plus.svg" alt=""><?= $tag ?></button></li>
                            <?php endforeach ?>
                        </ul>
                    <?php endforeach ?>
                </div>
            </div>
        </div>
    </div>

    <!--========== SELECTION ==========-->
    
    <div class="selection selection--open">
        <button class="selection__btn">
            <h1>Sélection</h1>
        </button>

        <div class="selection__content">
            <h2>Pratiques sélectionnées (<span class="count">0</span>)</h2>
            <ul class="selection__filters">
                
            </ul>
            <h2>Outils sélectionnés</h2>
            <ul class="selection__tools">

            </ul>

        </div>
    </div>
        
        <!--========== TOOLS ==========-->
        <div class="tools">
        <?php foreach($site->children()->listed() as $tool): ?>
            <section class="tool" data-tags="<?= $tool->tags() ?>" data-indicators="<?= $tool->indicators() ?>">
                <button class="tool__header">
                    <h2><?= $tool->title() ?></h2>
                    <div class="tool__indicators">
                        <?php if (str::contains($tool->indicators(), 'osinum')): ?>
                            <img class="picto" src="<?= url('assets/pictos') ?>/selection.svg" alt="">
                        <?php endif ?>
                        <?php if (str::contains($tool->indicators(), 'mobile')): ?>
                            <img class="picto" src="<?= url('assets/pictos') ?>/mobile.svg" alt="">
                        <?php endif ?>
                    </div>
                </button>
                <div class="tool__summary summary">
                    <h3 class="summary__fonction"><?= $tool->fonction()->inline() ?></h3>
                    
                    <p class="summary__description"><?= $tool->summary() ?></p>
                    
                    <ul class="summary__tags">
                        <?php foreach($tool->tags()->split() as $tag): ?>
                            <?php if ($tag): ?>
                                <li class="summary__tag --tagBtn"><?= $tag ?></li>
                            <?php endif ?>
                        <?php endforeach ?>
                    </ul>

                    <div class="pros">
                        <button class="pros__btn">
                            <h4 class="pros__title">Osinum l'apprécie pour :</h4>
                        </button>
                    </div>
                    <div class="cons">
                        <button class="cons__btn">
                            <h4 class="cons__title">Osinum avertit sur :</h4>
                        </button>
                    </div>
                </div>
            </section>
        <?php endforeach ?>
        </div>

</body>
</html>