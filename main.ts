function right () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 50, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 50, 67)
}
function back () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 50, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 50, 67)
}
function front () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 50, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 50, 67)
}
function left () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 100, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 50, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 50, 67)
}
function stop () {
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED2, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED1, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED3, 0, 67)
    PCA9685.setLedDutyCycle(PCA9685.LEDNum.LED4, 0, 67)
}
let RR = 0
let LL = 0
pins.digitalWritePin(DigitalPin.P14, 0)
pins.setPull(DigitalPin.P2, PinPullMode.PullUp)
pins.setPull(DigitalPin.P11, PinPullMode.PullUp)
let Distance = 0
PCA9685.init(67, 0)
let strip = neopixel.create(DigitalPin.P5, 18, NeoPixelMode.RGB)
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P14, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P14, 0)
    Distance = pins.pulseIn(DigitalPin.P15, PulseValue.High) / 58
    serial.writeLine("" + (Distance))
    LL = pins.digitalReadPin(DigitalPin.P2)
    RR = pins.digitalReadPin(DigitalPin.P11)
    if (Distance > 15) {
        if (LL == 1 && RR == 1) {
            front()
            strip.showColor(neopixel.colors(NeoPixelColors.Blue))
        } else if (LL == 1 && RR == 0) {
            left()
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        } else if (LL == 0 && RR == 1) {
            right()
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        } else {
            back()
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            basic.pause(1000)
            left()
            basic.pause(200)
        }
    } else {
        if (LL == 1 && RR == 1) {
            left()
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        } else if (LL == 1 && RR == 0) {
            left()
            strip.showColor(neopixel.colors(NeoPixelColors.Purple))
        } else if (LL == 0 && RR == 1) {
            right()
            strip.showColor(neopixel.colors(NeoPixelColors.Yellow))
        } else {
            back()
            basic.pause(1000)
            strip.showColor(neopixel.colors(NeoPixelColors.Red))
            left()
            basic.pause(200)
        }
    }
})
