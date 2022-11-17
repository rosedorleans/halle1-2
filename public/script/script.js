$( document ).ready(function() {

    $('#nav_home').off("click")
    $('#nav_home').on("click", async function(){
        // afficher la page et effacer la précédente + elements
        $('#page_map, #page_ambiantal, #page_floors, #page_companyList').css('display', 'none')
        $('#sidebar_content.open').removeClass('open')
        $('.flower.active').removeClass('active')
        $('#page_home').css('display', 'flex')
        // changer le bouton du menu actif
        $('nav span.active').removeClass('active')
        $(this).addClass('active')
    })

    $('#block_ambiantal').off("click")
    $('#block_ambiantal').on("click", function(){
        // afficher la page et effacer la précédente
        $('#page_home').css('display', 'none')
        $('#page_ambiantal').css('display', 'flex')
    })

    $('#block_floors').off("click")
    $('#block_floors').on("click", function(){
        // afficher la page et effacer la précédente
        $('#page_home').css('display', 'none')
        $('#page_floors').css('display', 'flex')
    })

    $('#block_companyList').off("click")
    $('#block_companyList').on("click", function(){
        // afficher la page et effacer la précédente
        $('#page_home').css('display', 'none')
        $('#page_companyList').css('display', 'flex')
        // remplir la liste d'entreprise
        $.ajax({
            type: "GET",
            url: "https://127.0.0.1:8000/company/all",
            success: function(response){        
                let T_companies = response.companies
                $('#company-list').empty()
                $.each(T_companies, function(key, company) {
                    console.log('company:', company)
                    let activity = getActivity(company)
                    $('#company_list').append(
                        '<div class="company-block">'+
                            '<img src="img/company/'+company.photo+'.png" alt="photo">'+
                            '<div>'+
                                '<p class="company-room">'+company.room+'</p>'+
                                '<p class="company-name">'+company.name+'</p>'+
                                '<p class="company-activity">'+activity+'</p>'+
                            '</div>'+
                        '</div>'
                    )
                });
            }
        })
    })

    $('#nav_map').off("click")
    $('#nav_map').on("click", async function(){
        // afficher la page et effacer la précédente
        $('#page_home, #page_ambiantal, #page_floors, #page_companyList').css('display', 'none')
        $('#page_map').css('display', 'flex')
        // changer le bouton du menu actif
        $('nav span.active').removeClass('active')
        $(this).addClass('active')

        $('.flower').off("click")
        $('.flower').on("click", async function(){
            let flower = this
            let company_id = $(this).attr('id').split('_')[1]

            // récupérer les données de l'entreprise
            await $.ajax({
                type: "GET",
                url: "https://127.0.0.1:8000/company/" + company_id,
                success: function(response){        
                    console.log('response:', response)
                    $('.flower.active').removeClass('active')
                    $(flower).addClass('active')
                    let company = response.company
                    console.log('company:', company)

                    let hours = company.hours.split('|')[0] + " - " + company.hours.split('|')[1]
                    let activity = getActivity(company)
                    
                    // remplir les champs de la popup
                    $('#company_title h2').text(company.name)
                    $('#company_activity').text(activity)
                    $('#company_room').text(company.room)
                    $('#company_hours').text(hours)
                    $('#company_description').text(company.description)
                    $('#company_contactMail').text(company.contact.split('|')[0])
                    $('#company_contactPhone').text(company.contact.split('|')[1])
                    $('#company_map img').attr('src', 'img/locations/'+company.location)
                    $('#sidebar_content').addClass('open')
                }
            })
            $('#icon_openCompany').off("click")
            $('#icon_openCompany').on("click",function(){
                $('.flower.active').removeClass('active')
                $('#sidebar_content.open').removeClass('open')
            })
        })
    })
});

function getActivity(company) {
    let activity = ''
    switch(company.activity){
        case "1":
            activity = 'Développeur back-end';
            break;
        case "2":
            activity = 'Studio de photographie';
            break;
    }
    return activity
}

