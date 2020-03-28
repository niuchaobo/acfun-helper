class Acfun {
    constructor() {

    }

    async paseM3u8(href){
        let pageData = await this.getPageData(href);
        console.log(pageData);

    }

    getPageData(href){
        return new Promise((resolve, reject) => {
            $.ajax({
                url: href,
                type: 'GET',
                timeout: 10000,
                contentType: 'text/html; charset=utf-8',
                success: (data) => {console.log(data);resolve(data)},
                error: (xhr, status, err) => resolve(null),
            });
        });
    }

}
