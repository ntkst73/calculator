
function openTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    if (evt != undefined) {
        evt.currentTarget.className += " active";
    }
}

let firstTab = document.getElementById("first-tab");
openTab({
    currentTarget: firstTab
}, 'year-tab');



function changingColorSimpleRange() {
    let select = document.querySelectorAll('.custominput');
    if (select) {
        for (let i = 0; i < select.length; i++) {
            select[i].oninput = function () {
                var value = (this.value - this.min) / (this.max - this.min) * 100;
                select[i].style.background = 'linear-gradient(to right, #95E2AB 0%, #95E2AB ' + value + '%, #39454B ' + value + '%, #39454B 100%)'
            };
        }
    }
};

changingColorSimpleRange();


/* slider with two handlers */


var thumbsize = 14;

function draw(slider, splitvalue) {

    /* set function vars */
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var lower = slider.querySelector('.lower');
    var upper = slider.querySelector('.upper');
    var legend = slider.querySelector('.legend');
    var thumbsize = parseInt(slider.getAttribute('data-thumbsize'));
    var rangewidth = parseInt(slider.getAttribute('data-rangewidth'));
    var rangemin = parseInt(slider.getAttribute('data-rangemin'));
    var rangemax = parseInt(slider.getAttribute('data-rangemax'));
    var roundSplitvalue = Math.round(splitvalue);
    /* set min and max attributes */


    min.setAttribute('max', roundSplitvalue);
    max.setAttribute('min', roundSplitvalue);

    /* set css */
    min.style.width = parseInt(thumbsize + ((splitvalue - rangemin) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    max.style.width = parseInt(thumbsize + ((rangemax - splitvalue) / (rangemax - rangemin)) * (rangewidth - (2 * thumbsize))) + 'px';
    min.style.left = '0px';
    max.style.left = parseInt(min.style.width) + 'px';
    min.style.top = lower.offsetHeight + 'px';
    max.style.top = lower.offsetHeight + 'px';
    // legend.style.marginTop = min.offsetHeight+'px';
    slider.style.height = (lower.offsetHeight + min.offsetHeight + legend.offsetHeight) + 'px';

    /* correct for 1 off at the end */
    if (max.value > (rangemax - 1)) max.setAttribute('data-value', rangemax);

    /* write value and labels */
    max.value = max.getAttribute('data-value');
    min.value = min.getAttribute('data-value');
    lower.innerHTML = min.getAttribute('data-value');
    upper.innerHTML = max.getAttribute('data-value');
    setTimeout(calculations());


}

function init(slider) {
    /* set function vars */
    var min = slider.querySelector('.min');
    var max = slider.querySelector('.max');
    var rangemin = parseInt(min.getAttribute('min'));
    var rangemax = parseInt(max.getAttribute('max'));
    var avgvalue = (rangemin + rangemax) / 2;
    var legendnum = slider.getAttribute('data-legendnum');


    /* set data-values */
    min.setAttribute('data-value', rangemin);
    max.setAttribute('data-value', rangemax);

    /* set data vars */
    slider.setAttribute('data-rangemin', rangemin);
    slider.setAttribute('data-rangemax', rangemax);
    slider.setAttribute('data-thumbsize', thumbsize);
    slider.setAttribute('data-rangewidth', slider.offsetWidth);

    /* write labels */
    var lower = document.createElement('span');
    var upper = document.createElement('span');
    lower.classList.add('lower', 'value');
    upper.classList.add('upper', 'value');
    lower.appendChild(document.createTextNode(rangemin));
    upper.appendChild(document.createTextNode(rangemax));
    slider.insertBefore(lower, min.previousElementSibling);
    slider.insertBefore(upper, min.previousElementSibling);

    /* write legend */
    var legend = document.createElement('div');
    legend.classList.add('legend');
    var legendvalues = [];
    for (var i = 0; i < legendnum; i++) {
        legendvalues[i] = document.createElement('div');
        var val = Math.round(rangemin + (i / (legendnum - 1)) * (rangemax - rangemin));
        legendvalues[i].appendChild(document.createTextNode(val + '%'));
        legend.appendChild(legendvalues[i]);

    }
    slider.appendChild(legend);

    /* draw */
    draw(slider, avgvalue);

    /* events */
    min.addEventListener("input", function () {
        update(min);
    });
    max.addEventListener("input", function () {
        update(max);
    });
    triggered();

    console.log(rangemax);
    console.log('3', thirdvalue);
    console.log('calc', calculations());
    calculations();

}

function triggered() {

    let selectInput = document.getElementsByClassName("slide-container");

    for (let i = 0; i < selectInput.length; i++) {
        let inputTotalValue = selectInput[i].querySelector(".input-style");
        let rangeValueLocked = selectInput[i].querySelector(".custominput");
        inputTotalValue.addEventListener("input", function () {
            rangeValueLocked.value = inputTotalValue.value;
            var value = (rangeValueLocked.value - rangeValueLocked.min) / (rangeValueLocked.max - rangeValueLocked.min) * 100;
            rangeValueLocked.style.background = 'linear-gradient(to right, #95E2AB 0%, #95E2AB ' + value + '%, #fff ' + value + '%, white 100%)';
            console.log('val', value);
            calculations();
        });
        rangeValueLocked.addEventListener("input", function () {
            inputTotalValue.value = rangeValueLocked.value;
            calculations();
        });
    }
}

let nativeToken = 0;
let yieldToken;
let lpToken = 0;

function calculations() {
    let totalValueLocked = document.getElementById("inputTotalValue").value;
    let currentPrice = document.getElementById("currentPrice").value;
    let apy = document.getElementById("apy").value;

    let earnedYear = (totalValueLocked * (apy / 100));
    let earnedPerDayDollars = earnedYear / 365;
    let earnedPerDayYieald = earnedPerDayDollars / currentPrice;

    let nativeRewardsDistribution = (earnedYear * (nativeToken / 100));
    let yieldTokensDistribution = (earnedYear * (yieldToken / 100));
    let lpRewardsDistribution = (earnedYear * (lpToken / 100));

    let nativeBurnedDollars = (nativeRewardsDistribution * (5 / 100));
    let yieldBurnedDollars = (yieldTokensDistribution * (2.5 / 100));
    let lpBurnedDollars = (lpRewardsDistribution * (0 / 100));

    let nativeTokensBurned = Math.floor((nativeBurnedDollars / currentPrice));
    let yieldTokensBurned = Math.floor((yieldBurnedDollars / currentPrice));
    let lpTokenBurned = (lpBurnedDollars / currentPrice);

    let nativeDollarsRewardsAfterFee = (nativeRewardsDistribution - (nativeBurnedDollars * 2));
    let yieldDollarsRewardsAfterFee = (yieldTokensDistribution - (yieldBurnedDollars * 2));
    let lpDollarsRewardsAfterFee = (lpRewardsDistribution - (lpBurnedDollars * 2));

    let yieldTokensPurchased = Math.floor(yieldDollarsRewardsAfterFee / currentPrice);
    let yieldLpTokensPurchased = Math.floor(lpDollarsRewardsAfterFee / currentPrice / 2);

    let monthNativeTokensBurned = Math.floor(nativeTokensBurned / 12);
    let monthYieldTokensBurned = Math.floor(yieldTokensBurned / 12);

    let monthYieldTokensPurchased = Math.floor(yieldTokensPurchased / 12);
    let monthYieldLpTokensPurchased = Math.floor(yieldLpTokensPurchased / 12);

    let weekNativeTokensBurned = Math.floor(nativeTokensBurned / 52);
    let weekYieldTokensBurned = Math.floor(yieldTokensBurned / 52);

    let weekYieldTokensPurchased = Math.floor(yieldTokensPurchased / 52);
    let weekYieldLpTokensPurchased = Math.floor(yieldLpTokensPurchased / 52);

    let dayNativeTokensBurned = Math.floor(nativeTokensBurned / 365);
    let dayYieldTokensBurned = Math.floor(yieldTokensBurned / 365);

    let dayYieldTokensPurchased = Math.floor(yieldTokensPurchased / 365);
    let dayYieldLpTokensPurchased = Math.floor(yieldLpTokensPurchased / 365);

    document.getElementById("nativeTokensBurned").innerHTML = nativeTokensBurned.toLocaleString();
    document.getElementById("yieldTokensBurned").innerHTML = yieldTokensBurned.toLocaleString();
    // document.getElementById("lpTokenBurned").innerHTML = lpTokenBurned;

    document.getElementById("yieldTokensPurchased").innerHTML = yieldTokensPurchased.toLocaleString();
    document.getElementById("yieldLpTokensPurchased").innerHTML = yieldLpTokensPurchased.toLocaleString();

    document.getElementById("monthNativeTokensBurned").innerHTML = monthNativeTokensBurned.toLocaleString();
    document.getElementById("monthYieldTokensBurned").innerHTML = monthYieldTokensBurned.toLocaleString();

    document.getElementById("monthYieldTokensPurchased").innerHTML = monthYieldTokensPurchased.toLocaleString();
    document.getElementById("monthYieldLpTokensPurchased").innerHTML = monthYieldLpTokensPurchased.toLocaleString();

    document.getElementById("weekNativeTokensBurned").innerHTML = weekNativeTokensBurned.toLocaleString();
    document.getElementById("weekYieldTokensBurned").innerHTML = weekYieldTokensBurned.toLocaleString();

    document.getElementById("weekYieldTokensPurchased").innerHTML = weekYieldTokensPurchased.toLocaleString();
    document.getElementById("weekYieldLpTokensPurchased").innerHTML = weekYieldLpTokensPurchased.toLocaleString();

    document.getElementById("dayNativeTokensBurned").innerHTML = dayNativeTokensBurned.toLocaleString();
    document.getElementById("dayYieldTokensBurned").innerHTML = dayYieldTokensBurned.toLocaleString();

    document.getElementById("dayYieldTokensPurchased").innerHTML = dayYieldTokensPurchased.toLocaleString();
    document.getElementById("dayYieldLpTokensPurchased").innerHTML = dayYieldLpTokensPurchased.toLocaleString();

    // console.log(totalValueLocked);
    // console.log(currentPrice);
    // console.log(apy);
    // console.log('Nt', nativeToken);
    // console.log('Yt', yieldToken);
    // console.log('LP', lpToken);
    //
    // console.log('earned Year', earnedYear);
    // console.log('earned Dollars per Day', earnedPerDayDollars);
    // console.log('earned Per Day Yieald Tokens', earnedPerDayYieald);
    // console.log('native token Rewards Distribution', nativeRewardsDistribution);
    // console.log('yield token Rewards Distribution', yieldTokensDistribution);
    // console.log('LP token Rewards Distribution', lpRewardsDistribution);
    // console.log('native Burned Dollars', nativeBurnedDollars);
    // console.log('yield Burned Dollars', yieldBurnedDollars);
    // console.log('lp Burned Dollars', lpBurnedDollars);
    // console.log('native tokenes burned', nativeTokensBurned);
    // console.log('yield tokens burned', yieldTokensBurned);
    // console.log('LP tokens burned', lpTokenBurned);
    // console.log('Native dollars rewards after fee', nativeDollarsRewardsAfterFee);
    // console.log('Yield dollars rewards after fee', yieldDollarsRewardsAfterFee);
    // console.log('LP dollars rewards after fee', lpDollarsRewardsAfterFee);

    // console.log('Yield Tokens Purchesed', yieldTokensPurchesed);
    // console.log('Yield LP Tokens Purchesed', yieldTokensPurchesed);

}

function changeColor() {
    var min = document.querySelector('#min');
    var max = document.querySelector('#max');
    var x = 'linear-gradient(to right, #89B6D7 0%, #89B6D7 ' + min.value / min.getAttribute('max') * 100 + '%, #95E2AB ' +
        min.value / min.getAttribute('max') * 100 + '%, #95E2AB 100%)';

    var y = 'linear-gradient(to right, #95E2AB 0%, #95E2AB ' + (max.value - max.getAttribute('min')) / (100 - max.getAttribute('min')) * 100 + '%, #DBDD64 ' +
        (max.value - max.getAttribute('min')) / (100 - max.getAttribute('min')) * 100 + '%, #DBDD64 100%)';
    console.log('atribute', min.value / min.getAttribute('max') * 100);
    console.log('Minnnnn', min.value);
    console.log('maxxx', min.getAttribute('max'));

    min.style.backgroundImage = x;
    max.style.backgroundImage = y;


    console.log('min.style.backgroundImage', x);
}


function update(el) {
    /* set function vars */
    var slider = el.parentElement;
    var min = slider.querySelector('#min');
    var max = slider.querySelector('#max');

    var minvalue = Math.round(min.value);
    var maxvalue = Math.round(max.value);


    let rangeValueLocked = document.getElementById("rangeValueLocked").value;

    var thirdvalue = 100 - maxvalue;
    var middlevalue = maxvalue - minvalue;
    // var thirdValue = document.querySelector('thirdvalue');

    /* set inactive values before draw */
    min.setAttribute('data-value', minvalue);
    max.setAttribute('data-value', maxvalue);

    var avgvalue = (minvalue + maxvalue) / 2;
    console.log(maxvalue);
    /* draw */
    draw(slider, avgvalue);
    document.getElementById("thirdvalue").innerHTML = thirdvalue;
    document.getElementById("secondvalue").innerHTML = middlevalue;
    document.getElementById("firstvalue").innerHTML = minvalue;
    nativeToken = minvalue;
    yieldToken = middlevalue;
    lpToken = thirdvalue;

    changeColor();
    calculations();
    console.log('min', minvalue);
    console.log('max', maxvalue);
    // document.getElementById("totalValueLocked").innerHTML = rangeValueLocked;
    // console.log('rangeVal:', rangeValueLocked);

}


var sliders = document.querySelectorAll('.min-max-slider');
sliders.forEach(function (slider) {
    init(slider);
});

/* end of slider with two handlers */

let valueToken = document.querySelector('.value-tokens');
let resultValueToken = valueToken.textContent.split(',').join(' ')
valueToken.textContent = resultValueToken;


const response = fetch('https://api.coingecko.com/api/v3/coins/defi-yield-protocol');
response.then(response => console.log(response))


console.log(request);