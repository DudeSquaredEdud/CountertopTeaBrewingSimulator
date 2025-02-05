let date = new Date();

export function loading_quote(){
    let quote_list = [
        "Made by EVIL WARLOCKS. GET WARLOCK'D.",
        "Maden't by Ashton Andrepont.",
        "The only simulation with tea in it.",
        "Year of the year of the snake of the snakey snake.",
        "Snake of the year award goes to the snake.",
        "Shart.",
        "You can't believe what they say in the darkness.",
        "The shrimp is armed. The arms are invisible.",
        "It's a scary world out there when it's raining sharks and knives and blood and rain and smells and dead animals.",
        "The authentic simulated Countertop Tea Brewing experience is at your finertips.",
        "The game that counters your top and brews your simulation.",
        "The evil within.",
        "Counter-brewing the tea-top, tip-toe sprint non-stop.",
        "As opposed to Counterbottom Tea Brewing Reality.",
        "The most realistic simulation for this exact thing.",
        "The least realistic simulation for this exact thing.",
        ":)",
        "The spoons have achieved consciousness. Hide your sugar.",
        "Warning: This simulation contains trace amounts of asbestos.",
        "Brewing tea with quantum uncertainty since yesterday.",
        "The sea whispers ancient secrets at midnight.",
        "Definitely not approved by your mother.",
        "Your teacup may or may not.",
        "Caution: Digital caffeine is still cocaine.",
        "The simulation runs on recycled starguts.",
        "Now with 47% more imaginary ingredients.",
        "The void stares back. It's lonely and wants some tea and company. When's the last time you called your void?",
        "Brewing in parallel universes simultaneously in half an A press.",
        "The moths have stolen the moon again.",
        ":̴̢̧͉̹̭̝͎̫̲͚̩͓̲͆͑̈́̅̊̈́̊̈́̈̕͝)̷̨͎͚̲̩͓̭̝͎̫̲͚̩͓̲",
        "The microwave is singing again. It knows opera now.",
        "Sometimes the walls taste like purple.",
        "The fish know what you did. They're very disappointed.",
        "The darkness blinked first. Now it won't stop winking.",
        "The birds aren't real, but their judgement is.",
        "Your reflection has been plotting. It's quite good at it, tell it I said hi.",
        "The shadows are having a party without you.",
        "Your teeth remember everything. Everything.",
        "˙ʎɐʍ ƃuoɹʍ ǝɥʇ ƃuᴉpɐǝɹ ǝɹ,no⅄",
        "The toaster is collecting secrets. It has quite a library.",
        "The ceiling fan is watching. It's not very impressed.",
        "The doorknob remembers your fingerprints fondly.",
        "The mirror shows your future self. They're still waiting for you to blink.",
        "Your shadow has been practicing dance moves without you.",
        "The stairs count differently when you're not looking.",
        "That wasn't water you just drank, but it was trying its best.",
        "Reality machine broke. Using low-calorie sweetener instead, just to insult you.",

    ]

    if (date.getDate == 5 && date.getMonth == 12){
        document.getElementById("LoadingQuote").innerText = "It's my birthday!";
    }
    else{
        let choice = (Math.random() * quote_list.length).toFixed(0);
        console.log(choice, quote_list.length);
        document.getElementById("LoadingQuote").innerText = quote_list[choice];
        document.getElementById("loading_text").style.display = "unset";
        document.getElementById("ashton").style.display = "unset";
    }
}
