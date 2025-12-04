//Show the round trip field when checkbox is checked. Make the field mandatory when visible and disable the field when not visible to prevent pre-entered data
//from being submitted with the form when the checkbox is unticked.
function displayRoundTrip()
{
    const returnTripSection = document.getElementById("return-trip-information");
    const returnTripDateTime = document.getElementById("return-datetime");

    if(document.getElementById("round-trip-checkbox").checked)
    {
        returnTripSection.style.visibility = "visible";
        returnTripDateTime.required = true;
        returnTripDateTime.disabled = false;
    }
    else
    {
        returnTripSection.style.visibility = "hidden";
        returnTripDateTime.required = false;
        returnTripDateTime.disabled = true;
    }
}
