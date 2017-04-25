var URLList = new Mongo.Collection('URLs', { idGeneration: 'MONGO' });

var URLtoShort;
var ShortenedURL;
var myObjId;
var checkingURL;

String.prototype.hexEncode = function(){
    var hex, i;

    var result = "";
    for (i=0; i<this.length; i++) {
        hex = this.charCodeAt(i).toString(16);
        result += (hex).slice(-4);
    }

    return result
}

if (Meteor.isServer) {
    Meteor.publish('URLs', function () {
        return URLList.find();
    });
}

if(Meteor.isClient)
{
    Template.checkURL.helpers({
        check: function() {
            Meteor.subscribe("URLs");
            //Define the enteredURL as the extension of the URL. this removes localhost:3000/ and checks it is valid before converting.
            //This prevents converting an invalid HexString
            var enteredURL = window.location.href.substring(22);
            if (enteredURL == "") {
                console.log("EnteredURL Is Empty");
            }
            else if (enteredURL != "") {
                myObjId = new Mongo.ObjectID(enteredURL);
            }

            checkingURL = URLList.findOne({_id: myObjId});

            //make sure the search didn't return empty
            if(checkingURL != undefined)
            {
                //if there is no HTTP or HTTPS, add it.  NOTE: These are removed in the original entry however an extra check is A+, otherwise just load to the new window
                if(checkingURL.OriginalUrl.slice(0, 7) != "http://" || checkingURL.OriginalUrl.slice(0, 8) != "https://" ){
                    checkingURL.OriginalUrl = "http://" + checkingURL.OriginalUrl;
                    window.location = checkingURL.OriginalUrl;
                }
                else{
                    window.location = checkingURL.OriginalUrl;
                }
            }
            //if the search returned empty, nothing happens, prevents an undefined error.
            else if(checkingURL == undefined)
            {
                console.log("checkingURL Is Unfortunately: " + checkingURL.OriginalUrl);
            }
        }
    });

    Template.URLShortener.events({
        'submit form': function (event){
            //Prevent Auto Refresh
            event.preventDefault();

            //Entered URL in the text field
            URLtoShort = event.target.URLEntered.value;

            //remove all special https/http for simplicity in use
            if(URLtoShort.slice(0,7) == "http://"){
                URLtoShort = URLtoShort.slice(7);
            }
            else if(URLtoShort.slice(0,8) == "https://"){
                URLtoShort = URLtoShort.slice(8);
            }

            //Add to collection
            URLList.insert({
                OriginalUrl: URLtoShort
            });

            var user = URLList.findOne({OriginalUrl:URLtoShort});
            var thisID = user._id;

            //Write final shortURL
            ShortenedURL = "localhost:3000/" + thisID;

            //Output correct URL
            console.log(ShortenedURL);

            //Clear Entered Value
            event.target.URLEntered.value = "";

            //Display the shortened URL to the User to be copied
            prompt("Copy to clipboard: Ctrl+C, Enter", ShortenedURL);
        },
    })
}