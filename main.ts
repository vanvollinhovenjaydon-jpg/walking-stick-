/**
 * Smart Assistance Stick - Prototype Code
 */
/**
 * Wiring Configuration (from Blueprint):
 */
/**
 * HC-SR04: TRIG -> P1, ECHO -> P2
 */
/**
 * Buzzer: Positive -> P0
 */
let distance = 0
let duration = 0
// Show an icon on start to confirm system is ON
basic.showIcon(IconNames.Yes)
basic.forever(function () {
    // 1. Clear the trigger pin
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    // 2. Send a 10-microsecond pulse to TRIG to start measurement
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    // 3. Read the duration of the ECHO pulse in microseconds
    duration = pins.pulseIn(DigitalPin.P2, PulseValue.High)
    // 4. Calculate distance in centimeters (duration divided by 58)
    distance = duration / 58
    // 5. Audio Feedback Logic (Beep frequency increases as distance decreases)
    if (distance > 2 && distance <= 30) {
        // CRITICAL: Extremely close obstacle (2cm - 30cm) -> Rapid beeps
        // High pitch tone for 50ms
        pins.analogPitch(880, 50)
        // 50ms silence
        basic.pause(50)
    } else if (distance > 30 && distance <= 100) {
        // WARNING: Close obstacle (30cm - 100cm) -> Fast beeps
        // Medium-high pitch tone for 100ms
        pins.analogPitch(554, 100)
        // 150ms silence
        basic.pause(150)
    } else if (distance > 100 && distance <= 250) {
        // ALERT: Approaching obstacle (100cm - 250cm) -> Slow beeps
        // Standard tone for 150ms
        pins.analogPitch(440, 150)
        // 400ms silence
        basic.pause(400)
    } else if (distance > 250 && distance <= 400) {
        // NOTICE: Distant obstacle (250cm - 400cm) -> Very slow beeps
        // Standard tone for 200ms
        pins.analogPitch(440, 200)
        // 800ms silence
        basic.pause(800)
    } else {
        // SAFE: No obstacle detected within 400cm
        // Turn off sound
        pins.analogPitch(0, 0)
        // Reset buffer delay
        basic.pause(200)
    }
})
basic.forever(function () {
	
})
