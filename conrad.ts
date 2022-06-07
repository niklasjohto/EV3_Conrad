forever(function () {
  // Color sensors to detect if Conrad is near the border
  const atGameBorder = sensors.color1.isColorDetected(5);
  const atGameBorderBehind = sensors.color2.isColorDetected(5);

  // ! (Probably needs adjustments)
  // Check if Conrad is at the border of the game
  // If so turn a little and go backwards
  if (atGameBorder && !atGameBorderBehind) {
    if (sensors.gyro4.rate() <= 0) {
      motors.largeAD.tank(-50, -35);
    } else {
      motors.largeAD.tank(-35, -50);
    }

    music.playSoundEffect(sounds.systemOverpower);

    // Check if Conrad's behind is at the border of the game
    // If so, speed up and go forwards
  } else if (atGameBorderBehind) {
    motors.largeAD.run(80);
    music.playSoundEffect(sounds.movementsSpeedUp);
  } else {
    motors.largeAD.run(30);
  }

  // ! (Probably needs adjustment)
  // Check if target robot is close to Conrad
  // If so, active the medium motor and flip them over (Hopefully)
  if (sensors.ultrasonic3.distance() <= 50) {
    // Check if Conrad is near the border
    // If not, speed up to get a better chance at flipping them over
    if (!atGameBorder) {
      motors.largeAD.run(60);
    }
    motors.mediumC.ramp(100, 0, MoveUnit.MilliSeconds);
    music.playSoundEffect(sounds.movementsSnap);
  }
});
