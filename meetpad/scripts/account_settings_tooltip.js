const settings_tooltip = document.querySelector('.account-settings-tooltip');
const settings_tooltip_close = document.querySelector('.account-settings-tooltip__close');
const header__pfp = document.querySelector('.header__pfp');

header__pfp.addEventListener('click', settingsTooltipOn);
settings_tooltip_close.addEventListener('click', settingsTooltipOff);

function settingsTooltipOn(){
    settings_tooltip.classList.add('account-settings-tooltip--active');
}
function settingsTooltipOff(){
    settings_tooltip.classList.remove('account-settings-tooltip--active');
}

darkmode_toggle.addEventListener('click', changeTheme);

function changeTheme(){
    if(body.classList.contains('lightmode')){
        body.classList.remove('lightmode');
        body.classList.add('darkmode');
        localStorage.setItem('theme_mode', 'darkmode');
        darkmode_toggle.setAttribute('src', 'img/icons/darkmode-on-icon.png');
        darkmode_toggle_text.innerHTML = 'Wł.';
    }
    else if(body.classList.contains('darkmode')){
        body.classList.remove('darkmode');
        body.classList.add('lightmode');
        localStorage.setItem('theme_mode', 'lightmode');
        darkmode_toggle.setAttribute('src', 'img/icons/darkmode-off-icon.png');
        darkmode_toggle_text.innerHTML = 'Wył.';
    }
}