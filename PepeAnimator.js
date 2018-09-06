class PepeAnimator {
    //fps === refresh fps
    constructor(fps) {
        //:private lets
        //private functions
        let mic;// microphone
        let timeforrender = 1000 / fps;
        let fft;
       
        //whole logic for frame creation
        function renderTick() {
            fft.analyze();
            let bass, lowMid, highMid, overal;
            bass = fft.getEnergy("bass");//B
            lowMid = fft.getEnergy("lowMid");//R
            highMid = fft.getEnergy("highMid");//G
            let complementary_base = Math.max(bass, lowMid, highMid) + Math.min(bass, lowMid, highMid);
            overal = map((bass + lowMid + highMid) / 3, 0, 255, 3, 12);
            changeLineColor(complementary_base - lowMid, complementary_base - highMid, complementary_base - bass);
            changeParticleColor(lowMid, highMid, bass);
            changeParticleSize(overal);
            changeLineSize(overal/ 2);
        }
        //change all particles colors
        function changeParticleColor(red, green, blue) {
            pJSDom[0].pJS.particles.color.rgb.r = red;
            pJSDom[0].pJS.particles.color.rgb.g = green;
            pJSDom[0].pJS.particles.color.rgb.b = blue;
        }
        //change all line color
        function changeLineColor(red, green, blue) {
            pJSDom[0].pJS.particles.line_linked.color_rgb_line.r = red;
            pJSDom[0].pJS.particles.line_linked.color_rgb_line.g = green;
            pJSDom[0].pJS.particles.line_linked.color_rgb_line.b = blue;
        }
        //change size
        function changeLineSize(newsize) {
            pJSDom[0].pJS.particles.line_linked.width = newsize;
        }
        this.initialize = function () {
            mic= new p5.AudioIn();
            mic.start();
            fft = new p5.FFT();
            fft.setInput(mic);;
            renderingTimer = setInterval(renderTick, timeforrender);
        };
    }
}
//change particle size
function changeParticleSize(newSize) {
    pJSDom[0].pJS.particles.size.anim.speed = 9999;
    pJSDom[0].pJS.particles.size.value = newSize + 0.0001;
    pJSDom[0].pJS.particles.size.anim.size_min = newSize;
    pJSDom[0].pJS.particles.size.anim.speed = 12;
}
