        var name = window.location.href.split('=')[1];
        console.log(name);
        if (name == "undefined" && name != "") {
            name = "Shivam!"
        }

        if (name != 'undefined' && name != "") {
            $('#name').text(name);
        }
        
        name = name.charAt(0).toUpperCase() + name.slice(1);
        $(document).attr("title", name + " Wishes You");
        
        var reg = new RegExp("^[a-zA-Z]+$");

        function copy() {
            if (reg.test($('#generate').val())) {
                var newName = $('#generate').val(),
                    link = "http://creative-je.com/wish/?n=" + newName;
                $("#url").val(link);
                $("#url").select();
                document.activeElement.blur();
                document.execCommand("Copy");
                setTimeout(() => {
                    $("#alert-box").addClass("zoom");
                }, 500);
                setTimeout(() => {
                    window.location.href = link;
                }, 3500);
            } else {
                $("#generate").addClass("animated shake");
                setTimeout(() => {
                    $("#generate").removeClass("animated shake");
                }, 1000);
            }
                
            }
        
            $('#newLink').click(function () {copy()});
        
            $("input[type='text']").keypress(function (e) {
                if (e.which === 13) {
                    copy();
                }
            });

        $('.fa-whatsapp').click(function () {
            var newName = $('#generate').val(),
                link = "http://creative-je.com/wish/?n=" + newName,
                whatsapp = "https://api.whatsapp.com/send?text=" + "Click Me!" + " " + encodeURIComponent(link);
            if (reg.test($('#generate').val())) {
                    window.open(whatsapp, '_blank');
                } else {
                $("#generate").addClass("animated shake");
                setTimeout(() => {
                    $("#generate").removeClass("animated shake");
                }, 1000);
                }
                
        });

        
        $("#enter").click(function () {
                $("#left-color").css("animation-play-state", "running");
                $("#right-color").css("animation-play-state", "running");
                $("#enter").addClass("animated rotateOut");
                $("#container").css("display", "block");
                $("#enter-box").css("display", "none");
                $("#newMusic").get(0).play();
                $("#newMusic").get(0).pause();
                setTimeout(() => {
                     $("#bgMusic").get(0).play();
                }, 1000);
                
                $("#myMusic").get(0).play();
                $("#myMusic").get(0).onended = function () {
                
                    responsiveVoice.speak(name + " wishes you",
                     "UK English Female", { 
                            pitch: 2 ,
                         onstart: function () { $('#bgMusic').animate({ volume: 0.3 }, 500)},
                         onend: function () {
                             $("#newMusic").get(0).play();
                             
                          }
                        });
                };

            });

