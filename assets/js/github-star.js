/*
 * https://github.com/MSFPT/GitHubStar
 */

let star_script = document.querySelector("script[status=GitHubStar]");

let user         = star_script.getAttribute("user");
let repository   = star_script.getAttribute("repository");

let github_api     = "https://api.github.com/repos/"+user+"/";
let github_profile = "https://github.com/"+user+"/";

let endpoint = github_api + repository;

let star_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
star_svg.setAttribute("viewBox", "0 0 512 512");
star_svg.innerHTML = '<path d="M497.998,249.932c27.473-26.88,12.268-73.626-25.795-79.148L350.606,157.84c-0.406-0.076-1.449-0.834-1.989-1.933    L297.134,27.288c-8.4-17.11-23.474-26.427-40.123-27.218c-18.701,0.79-33.789,10.116-41.481,25.724l-52.805,131.585    c0.119-0.386-0.942,0.384-2.186,0.566L40.58,170.682c-38.894,5.627-54.094,52.428-26.552,79.299l88.211,87.061    c0.97,0.949,1.379,2.211,1.165,3.467L83.335,457.56c-6.512,37.928,33.312,66.858,67.375,48.939    c70.151-36.873,105.306-55.291,105.464-55.255l105.097,55.257c34.076,17.906,73.867-11,67.394-48.925l-20.099-117.098    c-0.208-1.221,0.197-2.467,1.098-3.344L497.998,249.932z M366.509,347.667l20.101,117.108c0.524,3.072-2.709,5.42-5.488,3.959    l-105.126-55.272c-5.817-3.045-12.04-4.648-18.552-5.09l-2.882-0.001c-6.549,0.442-12.79,2.049-18.579,5.1l-105.132,55.264    c-2.764,1.454-5.991-0.89-5.464-3.96l20.075-117.082c2.565-15.075-2.407-30.409-13.318-41.084l-88.232-87.081    c-2.33-2.273-1.096-6.073,1.987-6.52l119.982-12.741c15.944-2.315,28.998-11.797,35.771-25.5L254.467,43.16    c-0.036,0.216,0.956-0.397,2.541-0.472c-0.449,0.075,0.56,0.698,1.206,2.003l51.454,128.56    c7.401,15.2,20.468,24.699,35.596,26.911l121.62,12.948c2.275,0.346,3.509,4.145,1.177,6.42l-88.277,87.147    C368.932,317.255,363.945,332.601,366.509,347.667z" />';

var request = new XMLHttpRequest();

request.onreadystatechange = function () {

    if (this.readyState == 4 && this.status == 200) {

        let data = JSON.parse(this.responseText);
        
        let style = document.createElement('style');
        let head = document.head || document.getElementsByTagName('head')[0];

        head.appendChild(style);

        style.type = 'text/css';

        css_style = ".github-star {position: fixed;width: auto;height: 28px;background-color: #eee;background-image: -webkit-gradient(linear,left top,left bottom,color-stop(0,#fcfcfc),to(#eee));background-image: linear-gradient(to bottom,#fcfcfc 0,#eee 100%);background-repeat: no-repeat;border: 1px solid #d5d5d5;bottom: 64px;border-radius: 5px;overflow: hidden;box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.25);transition: all .15s;right: 64px;}.github-star * {color: #353535;fill: #353535;transition: .15s all;text-decoration: none}.github-star svg {float: left;height: 66%;margin: calc(28px / 100 * 17) 6px;}.github-star b {float: left;height: 28px;line-height: 28px;text-decoration: none;font-size: 12pt;padding: 0 6px;border-right: none;margin-right: 0;border-left: 2px solid rgba(0, 0, 0, 0.1);}@media screen and (max-width: 600px) {.github-star {bottom: 32px !important;right: 32px !important;}}@media screen and (max-width: 400px) {.github-star {bottom: 18px !important;right: 18px !important;}}"

        if (style.styleSheet){
            style.styleSheet.cssText = css_style;
        } else {
            style.appendChild(document.createTextNode(css_style));
        }

        let star_button = document.createElement('a');

        star_button.href = github_profile + repository;
        star_button.target = "_blank";

        star_button.classList.add("github-star");

        let stars_count = document.createElement('b');
        stars_count.innerText = data.stargazers_count;

        star_button.appendChild(star_svg);
        star_button.appendChild(stars_count);

        document.body.appendChild(star_button);

    }
};

request.open("GET", endpoint, true);
request.send();