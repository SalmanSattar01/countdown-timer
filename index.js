#!/usr/bin/env node
import inquirer from 'inquirer';
import { differenceInSeconds, parseISO } from 'date-fns';
async function countdownTimer() {
    const { targetDate } = await inquirer.prompt([
        {
            type: 'input',
            name: 'targetDate',
            message: 'Enter the target date (YYYY-MM-DD HH:MM:SS):',
            validate: (input) => {
                if (!input.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
                    return 'Please enter a valid date and time in the format YYYY-MM-DD HH:MM:SS';
                }
                return true;
            }
        }
    ]);
    while (true) {
        const targetDateTime = parseISO(targetDate);
        const currentTime = new Date();
        const remainingTime = differenceInSeconds(targetDateTime, currentTime);
        // const remainingTime:any = formatDistanceStrict(currentTime, targetDateTime,);
        const day = Math.floor((remainingTime / (60 * 60 * 24)));
        const min = Math.floor((remainingTime % (60 * 24)) / 60);
        const sec = Math.floor(remainingTime % 60);
        console.log(`Countdown timer: Remaining Days ${day.toString().padStart(2, "0")}, ${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`);
        if (targetDateTime <= currentTime) {
            console.log("Timer expired!");
            break; // exit the loop when the timer expires
        }
        // Wait for 1 second before updating the countdown
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
countdownTimer().catch(console.error);
