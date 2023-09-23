const modeSwitch = document.querySelector('.mode-switch')
const circle1 = document.querySelector('.circle1')
const circle2 = document.querySelector('.circle2')
let mode = 'light'

const rootColors = document.querySelector(":root")


modeSwitch.addEventListener('click',function() {
    console.log('asd');
    if (mode == 'light') {
        modeSwitch.style.backgroundColor = 'var(--moon-background)'
        circle1.style.backgroundColor = 'var(--moon)'
        circle2.style.backgroundColor = 'var(--moon-background)'

        rootColors.style.setProperty('--sub',"13, 19, 33")
        rootColors.style.setProperty('--main',"29, 45, 68")
        rootColors.style.setProperty('--text',"162, 192, 190")

        rootColors.style.setProperty('--color1',"153,82,82")
        rootColors.style.setProperty('--color2',"82,142,107")
        rootColors.style.setProperty('--color3',"150, 93, 184")
        rootColors.style.setProperty('--color5',"184, 20, 99")
        rootColors.style.setProperty('--color6',"183, 62, 1")
        rootColors.style.setProperty('--color7',"73, 110, 108")
        
        circle2.style.top = '0'
        circle2.style.left = '0'

        mode = 'dark'
    } else if (mode == 'dark') {
        modeSwitch.style.backgroundColor = 'var(--sun-background)'
        circle1.style.backgroundColor = 'var(--sun)'
        circle2.style.backgroundColor = 'var(--sun-background)'

        rootColors.style.setProperty('--main',"243, 213, 181")
        rootColors.style.setProperty('--sub',"212, 162, 118")
        rootColors.style.setProperty('--text',"88, 49, 1")

        rootColors.style.setProperty('--color1',"205, 82, 82")
        rootColors.style.setProperty('--color2',"82, 205, 107")
        rootColors.style.setProperty('--color3',"186, 109, 207")
        rootColors.style.setProperty('--color5',"235, 75, 152")
        rootColors.style.setProperty('--color6',"255, 105, 31")
        rootColors.style.setProperty('--color7',"120, 165, 162")


        circle2.style.top = '-20px'
        circle2.style.left = '-20px'

        mode = 'light'
    }
    
})