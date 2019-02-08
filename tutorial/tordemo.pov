#include "colors.inc"

#declare HalfTorus = difference {
  torus {
    4, 1
    rotate x*-90
  }
  box { <-5, -5, -1>, <5, 0, 1> }
  pigment { Green }
}
#declare FlipOver = 180*x;
#declare TorusTranslate = 8;


camera {
  location <0, .1, -25>
  look_at 0
  angle 30
}

background { color Gray50 }
light_source {
  <300, 300, -1000> White
}

 union {
    object { Half_Torus }
    object { Half_Torus
      rotate Flip_It_Over
      translate x*Torus_Translate
    }
    object { Half_Torus
      translate x*Torus_Translate*2
    }
    object { Half_Torus
      rotate Flip_It_Over
      translate x*Torus_Translate*3
    }
    object { Half_Torus
      rotate Flip_It_Over
      translate -x*Torus_Translate
    }
    object { Half_Torus
      translate -x*Torus_Translate*2
    }
    object { Half_Torus
      rotate Flip_It_Over
      translate -x*Torus_Translate*3
    }
    object { Half_Torus
      translate -x*Torus_Translate*4
    }
    rotate y*45
    translate z*20
  }
