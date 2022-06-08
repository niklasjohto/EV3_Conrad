let atGameBorderLeft = sensors.color1.isColorDetected(5);
let atGameBorderRight = sensors.color3.isColorDetected(5);
let atGameBorderBehind = sensors.color2.isColorDetected(5);

forever(function () {
  atGameBorderLeft = sensors.color1.isColorDetected(5);
  atGameBorderRight = sensors.color3.isColorDetected(5);
  atGameBorderBehind = sensors.color2.isColorDetected(5);

  if (atGameBorderBehind) {
    music.playSoundEffect(sounds.movementsSpeedUp);
    motors.largeAD.run(100, 1000);
  } else if (atGameBorderLeft) {
    music.playSoundEffect(sounds.systemOverpower);
    motors.largeAD.tank(-35, -55);

    sensors.color2.pauseUntilColorDetected(ColorSensorColor.Red);
    motors.largeAD.stop();
  } else if (atGameBorderRight) {
    music.playSoundEffect(sounds.systemOverpower);
    motors.largeAD.tank(-55, -35);

    sensors.color2.pauseUntilColorDetected(ColorSensorColor.Red);
    motors.largeAD.stop();
  } else {
    motors.largeAD.run(40);
  }

  brick.showNumber(sensors.ultrasonic4.distance(), 1);
  brick.showNumber(sensors.color1.color(), 2);
  brick.showNumber(sensors.color3.color(), 3);
  brick.showNumber(sensors.color2.color(), 4);
});

sensors.ultrasonic4.onEvent(UltrasonicSensorEvent.ObjectDetected, function () {
  if (sensors.ultrasonic4.distance() <= 16) {
    if (!atGameBorderLeft || !atGameBorderRight) {
      motors.largeAD.run(100);
    }

    music.playSoundEffect(sounds.movementsSnap);
    motors.mediumB.run(100, 1250);
    motors.mediumB.run(-100, 125);
  }
});
