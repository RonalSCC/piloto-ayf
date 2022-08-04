document.addEventListener('scroll', function(e) {
    var HeaderElement = document.getElementById('Header');
    if(HeaderElement)
    {
        var SectionPeriodo = document.getElementById('SectionAditional');
        if (SectionPeriodo) {
            var DistanceHeader = HeaderElement.offsetTop + HeaderElement.clientHeight;
            if(window.scrollY > DistanceHeader){
                if (!SectionPeriodo.classList.contains("StickySection")) {
                    SectionPeriodo.classList.add("StickySection");
                }
            }else{
                SectionPeriodo.classList.remove("StickySection");
            }
        }
    }
  });