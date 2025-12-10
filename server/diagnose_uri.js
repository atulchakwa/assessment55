const dotenv = require('dotenv');
const path = require('path');
const dns = require('dns');
const mongoose = require('mongoose');

dotenv.config({ path: path.join(__dirname, '.env') });

const uri = process.env.MONGO_URI;

if (!uri) {
    console.error('MONGO_URI is undefined found in .env');
    process.exit(1);
}

// Simple parser to avoid leaking credentials
try {
    const parts = uri.split('://');
    const protocol = parts[0];
    console.log(`Protocol: ${protocol}`);

    if (parts.length > 1) {
        const afterProtocol = parts[1];
        const atIndex = afterProtocol.indexOf('@');
        let hostPart = afterProtocol;
        if (atIndex !== -1) {
            hostPart = afterProtocol.substring(atIndex + 1);
        }

        // Remove query params and slash
        const slashIndex = hostPart.indexOf('/');
        if (slashIndex !== -1) {
            hostPart = hostPart.substring(0, slashIndex);
        }
        const qIndex = hostPart.indexOf('?');
        if (qIndex !== -1) {
            hostPart = hostPart.substring(0, qIndex);
        }

        console.log(`Extracted Hostname from URI: ${hostPart}`);

        if (protocol === 'mongodb+srv') {
            console.log(`\nResolving SRV records for _mongodb._tcp.${hostPart}...`);
            dns.resolveSrv(`_mongodb._tcp.${hostPart}`, (err, addresses) => {
                if (err) {
                    console.error('DNS SRV lookup failed:', err);
                } else {
                    console.log('SRV Records found:');
                    addresses.forEach(a => console.log(` - ${a.name}:${a.port}`));

                    // Check for domain match
                    const mismatch = addresses.some(a => !a.name.endsWith(hostPart) && !hostPart.endsWith(a.name.split('.').slice(1).join('.'))); // heuristic
                    if (mismatch) {
                        console.warn('\nWARNING: Some SRV records do not strictly match the URI hostname. This might cause "Server record does not share hostname with parent URI".');
                    } else {
                        console.log('\nHostname matching looks okay generally.');
                    }
                }

                // Also try connecting to see the error again in isolation
                console.log('\nAttempting Mongoose connection...');
                mongoose.connect(uri)
                    .then(() => {
                        console.log('Mongoose connected successfully!');
                        process.exit(0);
                    })
                    .catch(err => {
                        console.error('Mongoose connection failed:', err.name);
                        console.error(err.message);
                        process.exit(1);
                    });
            });
        }
    } else {
        console.log('Could not parse URI structure.');
    }

} catch (e) {
    console.error('Error parsing URI:', e);
}
