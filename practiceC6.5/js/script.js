const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    let deviceWidth = window.screen.width
    let deviceHeight = window.screen.height
    let windowScrollWidth = window.innerWidth
    let windowScrollHeight = window.innerHeight
    let windowWidth = document.documentElement.clientWidth
    let windowHeight = document.documentElement.clientHeight

    alert(`Размеры экрана.
    
    Общий размер экрана девайса.
    Ширина: ${deviceWidth}
    Длина: ${deviceHeight}
    
    Размер окна браузера.
    
    С полосой прокрутки.
    (разницу видно, если полоса есть на странице)
    Ширина: ${windowScrollWidth}
    Длина: ${windowScrollHeight}
    
    Без полосы прокрутки.
    Ширина: ${windowWidth}
    Длина: ${windowHeight}`)
})

