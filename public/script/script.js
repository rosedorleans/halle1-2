$( document ).ready(function() {

    $('#nav_home').off("click")
    $('#nav_home').on("click", async function(){
        $('#page_map').css('display', 'none')
        $('#sidebar_content').removeClass('open')
        $('.flower').removeClass('active')
        $('#page_home').css('display', 'flex')
    })

    $('#nav_map').off("click")
    $('#nav_map').on("click", async function(){
        $('#page_home').css('display', 'none')
        $('#page_map').css('display', 'flex')

        $('.flower').off("click")
        $('.flower').on("click", async function(){
            let flower = this
            let company_id = $(this).attr('id').split('_')[1]
    
            await $.ajax({
                type: "GET",
                url: "https://127.0.0.1:8000/company/" + company_id,
                success: function(response){        
                    console.log('response:', response)
                    $('.flower').removeClass('active')
                    $(flower).addClass('active')
                    let company = response.company
                    console.log('company:', company)
                    let activity = ''
                    switch(company.activity){
                        case "1":
                            activity = 'Agence Web';
                            break;
                        case "2":
                            activity = 'Autres';
                            break;
                    }
                    console.log(activity)
                    $('#company_title h2').text(company.name)
                    $('#company_activity').text(activity)
                    $('#company_description').text(company.description)
                    $('#company_contactMail').text(company.contact.split('|')[0])
                    $('#company_contactPhone').text(company.contact.split('|')[1])
                    $('#company_map img').attr('src', 'img/locations/'+company.location)
                    $('#sidebar_content').addClass('open')
                }
            })
            $('#icon_openCompany').off("click")
            $('#icon_openCompany').on("click",function(){
                $('.flower').removeClass('active')
                $('#sidebar_content').removeClass('open')
            })
        })
    })

});
