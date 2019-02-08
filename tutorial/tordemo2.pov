#include "colors.inc"

camera {
    location <0, 1, -25>
    look_at 0
    angle 50
}
background { color Gray50 }
light_source{ <300, 300, -1000> White }

// Translations
#declare Flip_It_Over = x*180;
#declare Torus_Translate = 8;
#declare Link_Translate = Torus_Translate*2-2*y;

// Textures
#declare Chain_Gold = texture {
    pigment { BrightGold }
    finish {
        ambient .1
        diffuse .4
        reflection .25
        specular 1
        metallic
    }
}

// Models
#declare Half_Torus = difference {
    torus {
        4,1
        sturm
        rotate x*-90  // so we can see it from the top
    }
    box { <-5, -5, -1>, <5, 0, 1> }
}
#declare ChainSegment = cylinder {
    <0, 4, 0>, <0, -4, 0>, 1
}
#declare Link = union {
    object {
        Half_Torus
        translate y*Torus_Translate/2
    }
    object {
        Half_Torus
        rotate Flip_It_Over
        translate -y*Torus_Translate/2
    }
    object {ChainSegment translate Torus_Translate*x/2}
    object {ChainSegment translate Torus_Translate*-x/2}
    texture {Chain_Gold}
}


union {
    object { Link }
    object { 
        Link
        translate Link_Translate*y
        rotate y*90
    }
    scale .25
}
