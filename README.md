Eante-InternshipChallenge-MeteorURLShortener

A big struggle with this was my lack of experience. I began at 3:15pm on the 24th of April, 2017.  At around 10:00pm everything was looking finished, I just had to locate
the OriginalUrl field of the object that referenced the OriginID attached to the 'Short' Link. 

For Example:

If I entered 'facebook.com' to be shortened, It would provide a unique _id: in the collection which lets say is: "ABC123".  My shortlink would then be generated
and was: "localhost3000:/ABC123".  This means that when I go to that url it will remove the domain localhost:3000/ and be left with the ID of ABC123.  From there it could
search the database for a unique _id: of ABC123 and then access it's OriginalUrl field and thus, redirect me to facebook.com

However, I am new to meteor and as a result I spent 4hours trying to use .findOne({_id: ABC123}); and I was only getting undefined.  This was because I wasn't publishing and subscribing properly. 

I fixed this problem at 1pm on the next day, the 25th of April, 2017.  It is now 4pm and I have spent a good portion of time messing with displaying the short url, I went with a prompt for simplicity.  I also added error handling if the URL has HTTP or HTTPS.

This isn't idiot proof but anyone looking to shorten a genuine URL will be in luck, if you enter "ORANGE" as the url it won't work but then again, if i enter "ORANGE" in a calculator that won't work either, it's just not designed for that.

I hope you have fun exploring this Repo and you find it useful!

~Lachlan Young - BuiltByProxy

