const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    
    const url = req.url;
    const method = req.method;

    if(url === '/') {
        res.write(
            `
                <html>
                    <body>
                        <form action="/message" method="POST">
                            <input type="text" name="message" >
                            <button type="submit">Send</button>
                        </form>
                    </body>
                </html>
            `
        );
        return res.end();
    } 
    if(url === "/message" && method === "POST") {
        const data = [];

        req.on('data', (chunk) => {
            data.push(chunk)
        })

        req.on('end', () => {
            const parseBody = Buffer.concat(data).toString();
            const message = parseBody.split('=')[1];
            fs.writeFileSync('message.txt', message);
        })
       
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }



    res.setHeader('Content-type', 'text/html');
    res.write(
        `
            <html>
                <body>
                    <input type="text" action="POST
                </body>
            </html>
        `
    );
    res.end();
});

server.listen(3001);

