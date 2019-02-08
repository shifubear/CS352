  #include "colors.inc"
  #include "textures.inc"
  camera {
    location  <-4, 3, -9>
    look_at   <0, 0, 0>
    angle 48
  }

    /*light_source {
    <0, 10, -3>
    color White
    spotlight
    radius 15
    falloff 18
    tightness 10
    point_at <0, 0, 0>
  }

    light_source {
    <10, 10, -1>
    color Red
    spotlight
    radius 12
    falloff 14
    tightness 10
    point_at <2, 0, 0>
  }
  light_source {
    <-12, 10, -1>
    color Blue
    spotlight
    radius 12
    falloff 14
    tightness 10
    point_at <-2, 0, 0>
  }*/
     light_source {
    <0, 20, 0>
    color Gray75
    fade_distance 5
    fade_power 1
    shadowless
  }

   plane {
    y, -1
    texture {
      pigment {
        checker
        color rgb<0.5, 0, 0>
        color rgb<0, 0.5, 0.5>
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
  sphere {
    <0, 1, 2>, 2
    texture {
      pigment {
        wood
        color_map {
          [0.0 color DarkTan]
          [0.9 color DarkBrown]
          [1.0 color VeryDarkBrown]
        }
        turbulence 0.05
        scale <0.2, 0.3, 1>
      }
      finish { phong 1 }
    }
  }
