let atGameBorderLeft = sensors.color1.isColorDetected(5);
let atGameBorderRight = sensors.color3.isColorDetected(5);
eBorderBehind = sensors.color2.isColorDetected(5);

forever(function () {
  atGameBorderLeft = sensors.color1.isColorDetected(5);
  atGameBorderRight = sensors.color3.isColorDetected(5);
  atGameBorderBehind = sensors.color2.isColorDetected(5);

  if (atGameBorderBehind) {
    music.playSoundEffect(sounds.movementsSpeedUp);

    motors.largeAD.run(100);
  } else if (atGameBorderLeft) {
    music.playSoundEffect(sounds.systemOverpower);
    motors.largeAD.tank(-40, -100);

    sensors.color2.pauseUntilColorDetected(ColorSensorColor.Red);
    motors.largeAD.stop();
  } else if (atGameBorderRight) {
    music.playSoundEffect(sounds.systemOverpower);
    motors.largeAD.tank(-100, -40);

    sensors.color2.pauseUntilColorDetected(ColorSensorColor.Red);
    motors.largeAD.stop();
  } else {
    motors.largeAD.run(80);
  }

  brick.showNumber(sensors.ultrasonic4.distance(), 1);
  brick.showNumber(sensors.color1.color(), 2);
  brick.showNumber(sensors.color3.color(), 3);
  brick.showNumber(sensors.color2.color(), 4);
});

sensors.ultrasonic4.onEvent(UltrasonicSensorEvent.ObjectDetected, function () {
  if (
    sensors.ultrasonic4.distance() >= 10 &&
    sensors.ultrasonic4.distance() <= 15
  ) {
    music.playSoundEffect(sounds.movementsSnap);
    motors.largeB.run(100, 500);

    motors.largeB.pauseUntilStalled();
    motors.largeB.reset();
  }
});
