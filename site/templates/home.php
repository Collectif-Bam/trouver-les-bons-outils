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
<body data-url="<?= $site->url() ?>" data-email="<?= $site->email() ?>" data-name="<?= $site->name() ?>">
    <!--========== SEARCH ==========-->
    <div class="sectionColor"></div>

    <div class="search search--open">
        <button class="search__btn unvisible">
            <h1>Recherche</h1>
            <img class="picto dropDown" src="<?= url('assets/pictos') ?>/drop-down.svg" alt="">
        </button>
        
        <div class="search__content">
            <div class="search__wrapper">
                <div class="search__welcome welcome">
                    <h2 class="welcome__message">
                        Bienvenue sur l’outil de diagnostic de vos outils !<br />
                        Pour commencer, activez les filtres qui vous intéressent.
                    </h2>
                    <button class="welcome__btn --tagBtn --tagBtn--light">
                        <h2>Voir les outils</h2> <span><img class="picto dropDown" src="<?= url('assets/pictos') ?>/drop-down.svg" alt=""></span>
                    </button>
                </div>
                <h2 class="search__title search__title--filters">Affichage</h2>
                <ul class="search__filters filters">
                    <li class="filters__wrapper">
                        <label for="filter--all" data-value="all"><input id="filter--all" class="filters__indicator" type="radio" name="filter">Tous les outils</label>
                    </li>
                    <li class="filters__wrapper">
                        <label for="filter--osinum" data-value="selection"><input id="filter--osinum" class="filters__indicator" type="radio" name="filter">Sélection Osinum</label>
                    </li>
                </ul>
                <div class="filters__wrapper filters__wrapper--selection">
                    <label for="mobile" data-value="mobile"><input id="mobile" class="filters__indicator" type="checkbox" name="mobile">Outils mobile uniquement</label>
                </div>
                
                <h2 class="search__title search__title--practices">Par pratiques</h2>
                <div class="search__list search__list--practices">
                    <?php foreach($site->tagsGroup()->toStructure() as $group): ?>
                        <ul class="search__group group">
                            <li><h3 class="group__title"><?= $group->title() ?></h3></li>
                            <?php foreach($group->tags()->split() as $tag): ?>
                                <li><button class="search__filter"><img class="plus" src="<?= url('assets/pictos') ?>/plus.svg" alt=""><?= $tag ?></button></li>
                            <?php endforeach ?>
                        </ul>
                    <?php endforeach ?>
                </div>
                <footer class="search__footer">
                    <a href="https://osinum.fr/" target="_blank">Proposé par  <span style="text-decoration: underline; font-weight: 300;">Osinum</span></a> | <a href="mailto:<?= $site->email() ?>">Nous contacter</a> | <a href="#">Crédits</a>
                </footer>
            </div>
        </div>
    </div>

    <!--========== SELECTION ==========-->
    
    <div class="selection selection--open">
        <button class="selection__btn">
            <h1>Sélection</h1>
        </button>

        <div class="selection__content">
            <h2 class="selection__sectionTitle selection__sectionTitle--filters">Filtres actifs <span class="hide">(<span class="practicesCount">0</span>)</span></h2>
            <div class="selection__indicators">  
                <div class="selection__indicators__osinum hide">
                    <svg class="picto" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path  clip-rule="evenodd" d="M19.6493 15.1575C20.4111 17.1202 20.49 19.3567 19.7073 21.4875C18.002 26.1256 12.8506 28.5079 8.211 26.8026C3.57291 25.0974 1.19062 19.9459 2.89587 15.3063C4.60112 10.6682 9.75257 8.28596 14.3922 9.99121C14.8728 10.1683 15.4085 9.92127 15.5855 9.43916C15.7626 8.95705 15.5156 8.42286 15.0335 8.24578C9.43116 6.18639 3.20984 9.0627 1.15044 14.665C-0.908948 20.2673 1.96736 26.4887 7.56968 28.5481C13.172 30.6075 19.3933 27.7311 21.4527 22.1288C22.3991 19.5561 22.3039 16.8539 21.3828 14.4835C21.1968 14.0043 20.6566 13.7678 20.179 13.9538C19.6999 14.1398 19.4633 14.6784 19.6493 15.1575ZM23.3678 0.554311C23.4764 0.509671 23.5969 0.484375 23.7219 0.484375C23.8469 0.484375 23.9674 0.509671 24.0761 0.554311L24.079 0.555799C24.1891 0.600439 24.2903 0.667399 24.3796 0.756679C24.4689 0.845959 24.5359 0.947143 24.5805 1.05726L24.582 1.05874C24.6266 1.16886 24.6519 1.2879 24.6519 1.41438V5.05105H28.2886C28.5296 5.05105 28.7499 5.1433 28.915 5.29359C28.9269 5.30401 28.9374 5.31442 28.9493 5.32633C29.3123 5.68791 29.3123 6.27865 28.9493 6.64023L25.0433 10.5462C24.8454 10.7441 24.5805 10.8349 24.3216 10.817H20.1968L14.0886 16.9253C14.3103 17.3523 14.4368 17.8374 14.4368 18.3523C14.4368 20.0575 13.0515 21.4414 11.3462 21.4414C9.64097 21.4414 8.25713 20.0575 8.25713 18.3523C8.25713 16.647 9.64097 15.2617 11.3462 15.2617C11.8611 15.2617 12.3462 15.3882 12.7732 15.6099L18.8859 9.49719V5.32038C18.8859 5.14628 18.9335 4.9826 19.0169 4.84273C19.0555 4.77874 19.1032 4.71774 19.1582 4.66268L23.0642 0.756679C23.1535 0.667399 23.2562 0.600439 23.3648 0.555799L23.3678 0.554311ZM22.7919 3.65977L20.7459 5.70577V8.95705H24.0017L26.0491 6.91105H23.7219L23.6713 6.90956L23.6252 6.9051L23.5791 6.89914L23.527 6.89022L23.4764 6.87682L23.4288 6.86343L23.3856 6.84855L23.344 6.8307L23.3038 6.81135L23.2636 6.79052L23.2249 6.76671L23.1877 6.74142L23.152 6.71463L23.1178 6.68785L23.0851 6.6566L23.0523 6.62535L23.0196 6.58815L22.9868 6.54946L22.9571 6.50929L22.9303 6.46762L22.9035 6.42298L22.8842 6.38281L22.8648 6.34263L22.8485 6.29948L22.8351 6.26228L22.8247 6.22359L22.8142 6.1849L22.8068 6.14473L22.8008 6.10455L22.7949 6.06438L22.7919 6.01676V5.98105V3.65977Z" fill="#2A3180"/>
                    </svg>
                    Sélection osinum
                </div>
                <div class="selection__indicators__mobile hide">
                    <svg class="picto" width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.37883 14.7908H6.38784M2.77471 17.4939H9.98295C10.4609 17.4939 10.9192 17.3041 11.2572 16.9661C11.5951 16.6282 11.785 16.1698 11.785 15.6919V3.07745C11.785 2.59951 11.5951 2.14115 11.2572 1.8032C10.9192 1.46525 10.4609 1.27539 9.98295 1.27539H2.77471C2.29678 1.27539 1.83842 1.46525 1.50047 1.8032C1.16252 2.14115 0.972656 2.59951 0.972656 3.07745V15.6919C0.972656 16.1698 1.16252 16.6282 1.50047 16.9661C1.83842 17.3041 2.29678 17.4939 2.77471 17.4939Z" stroke="#2A3180" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Outils mobile uniquement
                </div>
            </div>
            <ul class="selection__filters">
                
            </ul>
            <h2 class="selection__sectionTitle selection__sectionTitle--tools">Outils sélectionnés (<span class="toolsCount">0</span>)</h2>
            <ul class="selection__tools">
                <!-- Selected tools will be injected here -->
            </ul>
            <div class="selection__footer">
                <div class="form">
                    <input type="email" name="" id="" placeholder="adresse@mail.com" size="35%" required>
                    <label for="contact">
                        <input type="checkbox" name="contact" id="contact">
                        <div class="contact__message">
                        <h3>Je souhaite être recontacté</h3>
                        Notre équipe répond à vos questions, vous commenteille et vous présente les avantages et fonctionnalités d’Osinum.
                        </div>
                    </label>
                </div>
                
                <button class="formBtn">
                    <input class="form__submit" type="submit" name="submit" value="Ok">
                    <h2 class="formCTA">Recevoir ma sélection par mail</h2>
                </button>
            </div>
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
                            <svg class="picto osinum" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path  clip-rule="evenodd" d="M19.6493 15.1575C20.4111 17.1202 20.49 19.3567 19.7073 21.4875C18.002 26.1256 12.8506 28.5079 8.211 26.8026C3.57291 25.0974 1.19062 19.9459 2.89587 15.3063C4.60112 10.6682 9.75257 8.28596 14.3922 9.99121C14.8728 10.1683 15.4085 9.92127 15.5855 9.43916C15.7626 8.95705 15.5156 8.42286 15.0335 8.24578C9.43116 6.18639 3.20984 9.0627 1.15044 14.665C-0.908948 20.2673 1.96736 26.4887 7.56968 28.5481C13.172 30.6075 19.3933 27.7311 21.4527 22.1288C22.3991 19.5561 22.3039 16.8539 21.3828 14.4835C21.1968 14.0043 20.6566 13.7678 20.179 13.9538C19.6999 14.1398 19.4633 14.6784 19.6493 15.1575ZM23.3678 0.554311C23.4764 0.509671 23.5969 0.484375 23.7219 0.484375C23.8469 0.484375 23.9674 0.509671 24.0761 0.554311L24.079 0.555799C24.1891 0.600439 24.2903 0.667399 24.3796 0.756679C24.4689 0.845959 24.5359 0.947143 24.5805 1.05726L24.582 1.05874C24.6266 1.16886 24.6519 1.2879 24.6519 1.41438V5.05105H28.2886C28.5296 5.05105 28.7499 5.1433 28.915 5.29359C28.9269 5.30401 28.9374 5.31442 28.9493 5.32633C29.3123 5.68791 29.3123 6.27865 28.9493 6.64023L25.0433 10.5462C24.8454 10.7441 24.5805 10.8349 24.3216 10.817H20.1968L14.0886 16.9253C14.3103 17.3523 14.4368 17.8374 14.4368 18.3523C14.4368 20.0575 13.0515 21.4414 11.3462 21.4414C9.64097 21.4414 8.25713 20.0575 8.25713 18.3523C8.25713 16.647 9.64097 15.2617 11.3462 15.2617C11.8611 15.2617 12.3462 15.3882 12.7732 15.6099L18.8859 9.49719V5.32038C18.8859 5.14628 18.9335 4.9826 19.0169 4.84273C19.0555 4.77874 19.1032 4.71774 19.1582 4.66268L23.0642 0.756679C23.1535 0.667399 23.2562 0.600439 23.3648 0.555799L23.3678 0.554311ZM22.7919 3.65977L20.7459 5.70577V8.95705H24.0017L26.0491 6.91105H23.7219L23.6713 6.90956L23.6252 6.9051L23.5791 6.89914L23.527 6.89022L23.4764 6.87682L23.4288 6.86343L23.3856 6.84855L23.344 6.8307L23.3038 6.81135L23.2636 6.79052L23.2249 6.76671L23.1877 6.74142L23.152 6.71463L23.1178 6.68785L23.0851 6.6566L23.0523 6.62535L23.0196 6.58815L22.9868 6.54946L22.9571 6.50929L22.9303 6.46762L22.9035 6.42298L22.8842 6.38281L22.8648 6.34263L22.8485 6.29948L22.8351 6.26228L22.8247 6.22359L22.8142 6.1849L22.8068 6.14473L22.8008 6.10455L22.7949 6.06438L22.7919 6.01676V5.98105V3.65977Z" fill="#2A3180"/>
                            </svg>
                        <?php endif ?>
                        <?php if (str::contains($tool->indicators(), 'mobile')): ?>
                            <svg class="picto mobile" width="13" height="19" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.37883 14.7908H6.38784M2.77471 17.4939H9.98295C10.4609 17.4939 10.9192 17.3041 11.2572 16.9661C11.5951 16.6282 11.785 16.1698 11.785 15.6919V3.07745C11.785 2.59951 11.5951 2.14115 11.2572 1.8032C10.9192 1.46525 10.4609 1.27539 9.98295 1.27539H2.77471C2.29678 1.27539 1.83842 1.46525 1.50047 1.8032C1.16252 2.14115 0.972656 2.59951 0.972656 3.07745V15.6919C0.972656 16.1698 1.16252 16.6282 1.50047 16.9661C1.83842 17.3041 2.29678 17.4939 2.77471 17.4939Z" stroke="#2A3180" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        <?php endif ?>
                    </div>
                </button>
                <div class="tool__summary summary">
                    <h3 class="summary__fonction"><?= $tool->fonction()->inline() ?></h3>
                    <?php if ($tool->link()->isNotEmpty()): ?>
                        <a class="summary__link" href="<?= $tool->link() ?>" target="_blank">En savoir plus</a>
                    <?php endif ?>
                    
                    <p class="summary__description"><?= $tool->summary() ?></p>
                    
                    <ul class="summary__tags">
                        <?php foreach($tool->tags()->split() as $tag): ?>
                            <?php if ($tag): ?>
                                <li class="summary__tag --tagBtn --tagBtn--light"><?= $tag ?></li>
                            <?php endif ?>
                        <?php endforeach ?>
                    </ul>

                    <div class="comment">
                        <h4 class="comment__title">Osinum l'apprécie pour :<img class="picto dropDown dropDown--close" src="<?= url('assets/pictos') ?>/drop-down.svg" alt=""></h4>
                        <div class="comment__content hide">
                            <?= $tool->pros()->kt() ?>
                        </div>
                    </div>
                    <div class="comment">
                        <h4 class="comment__title">Osinum avertit sur : <img class="picto dropDown dropDown--close" src="<?= url('assets/pictos') ?>/drop-down.svg" alt=""></h4>
                        <div class="comment__content hide">
                            <?= $tool->cons()->kt() ?>
                        </div>
                    </div>
                </div>
            </section>
        <?php endforeach ?>
        </div>

</body>
</html>