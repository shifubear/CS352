#include "colors.inc"
#include "stones.inc"
#include "textures.inc"
#include "shapes.inc"
#include "glass.inc"
#include "metals.inc"
#include "woods.inc"
camera {
    location  <-4, 1, -9>
    look_at   <0, 0, 0>
    angle 48
}

light_source { 
    <2, 4, -3>
    color White
}

plane {
    y, -2
    texture {
        pigment {
        checker
        color Gray
        color White
        }
        finish {
        diffuse 0.4
        ambient 0.2
        phong 1
        phong_size 100
        reflection 0.25
        }
    }
}

cone {
    <-1, 4, 10>, 0.2    // Center and radius of one end
    <-1, -2, 10>, 1.0    // Center and radius of other end
    texture { T_Stone25 scale 4 }
}

box {
    <-3,-1,-3>
    <-2,0,-2>
    texture {
    pigment { NeonPink filter .9}
    finish {
      ambient .1
      diffuse .4
      reflection .1
    }
  }
}

#declare T = torus {
    4, 1
    texture {
        pigment { BrightGold }
        finish {
            ambient .1
            diffuse .4
            reflection .25
            specular 1
            metallic
        }
  }
}

object {
    T
    translate x*10
    translate y*-1
    translate z*12

}


#declare PokeballTop = merge {
    difference {
        sphere {
            <0,0,0>, 2
            texture {
                pigment { color Red }
                finish {phong 1 metallic}
            }
        }
        box {
            <-2, -2, -2> 
            <2, 0, 2>
        }
    }
    merge {
        difference {
            cylinder {
                <0,  .1, 0>,
                <0, -.1, 0>,
                2
                open
                texture {
                    pigment {color Black}
                }
            }
            sphere {
                <0, 0, -2>
                .5
            }
        }
        difference {
            cylinder {
                <0, 0, -2>
                <0, 0, -1.9>
                .5
                texture {
                    pigment {color Black}
                }
            }
            sphere {
                <0, 0, -2>
                .3
            }
        }
        cylinder {
            <0, 0, -2>
            <0, 0, -1.9>
            .3
            texture {
                pigment {color White}
            }
        }
        cylinder {
            <0, 0, -2.1>
            <0, 0, -2>
            .2
            texture {
                pigment {color White}
            }
        }
    }
}

#declare PokeballBottom = difference {
    difference {
        sphere {
            <0,0,0>, 2
            texture {
                pigment { color White }
                finish {phong 1 metallic}
            }
        }
        box {
            <-2, 0, -2> 
            <2, 2, 2>
        }
    }
    sphere {
        <0,0,0> 1.9
        texture {
            pigment { color White }
            finish {phong 1}
        }
    }
}

#declare Pokeball = merge {
    object {
        PokeballTop
        rotate 30*x
        translate y*1.15

    }
    PokeballBottom
}

#declare Head = merge {
    sphere {
        <0, 0, -.8>
        .6
        scale <.9,1,.9>
        texture {
            pigment {color <1,.803,.58>}
        }
    }
    difference {
        cylinder {
            <-.22, 0, -1.4>
            <-.22, 0, -1.35>
            .15
            texture {
                pigment {color Blue}
            }
        }
        sphere {
            <-.22, 0, -1.37>
            .1
        }
    }
    difference {
        cylinder {
            <.22, 0, -1.4>
            <.22, 0, -1.35>
            .15
            texture {
                pigment {color Blue}
            }
        }
        sphere {
            <.22, 0, -1.37>
            .1
        }
    }
    translate y*.4
    translate z*.4
    scale <1.2, 1.2, 1.2>
}

#declare Hand = sphere {
    <0, 0, -2.1>
    .3
    texture {
        pigment {color <1,.803,.58>}
    }
}

Pokeball
Head
object {
    Hand
    translate x*.7
}
object {
    Hand
    translate x*-.7
}






