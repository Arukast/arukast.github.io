<?php
$mainCircle = [
    ["img" => "2x3.jpg",  "caption" => "Tb. Alta Ulil Abshor / 102022300301 / Fakultas Rekayasa Industri / S1 Sistem Informasi"]
];

$supportCircle = [
    ["img" => "ig.jpeg", "link" => "https://www.instagram.com/tb.alta/", "caption" => "Instagram"],
    ["img" => "github.png", "link" => "https://github.com/Arukast", "caption" => "GitHub"],
    ["img" => "Steam_icon_logo.svg", "link" => "https://steamcommunity.com/id/arukast/",  "caption" => "Steam"],
    ["img" => "linkedin.png", "link" => "https://linkedin.com/in/tubagus-alta", "caption" => "LinkedIn"]
];
?>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Profile</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="circleContainer">
        <div class="mainContainer">
            <?php foreach ($mainCircle as $mainCircle): ?>
                <div class="mainCircle">
                    <img src="<?php echo $mainCircle["img"]; ?>" alt="Foto Profil" class="mainCircleImage">
                </div>
                <h1 class="mainCaption"><?php echo $mainCircle["caption"]; ?></h1>
            <?php endforeach; ?>
        </div>
        <div class="supportContainer">
            <?php foreach ($supportCircle as $supportCircle): ?>
                <div class="supportContainerItem1">
                    <a href="<?php echo $supportCircle["link"]; ?>" target="_blank">
                        <div class="supportCircle">
                            <img src="<?php echo $supportCircle["img"]; ?>" alt="IG Icon" class="supportCircleImage">
                        </div>
                    </a>
                    <h3 class="supportCircleCaption"><?php echo $supportCircle["caption"]; ?></h3>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</body>
</html>
