"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle2, XCircle } from "lucide-react"

const ELIGIBLE_STATES = [
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Idaho",
  "Illinois",
  "Kansas",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Missouri",
  "Montana",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Puerto Rico",
  "Rhode Island",
  "South Carolina",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "Wisconsin",
]

export default function QualificationSection() {
  const [creditScore, setCreditScore] = useState<string | null>(null)
  const [homeOwnership, setHomeOwnership] = useState<string | null>(null)
  const [state, setState] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const isQualified = creditScore === "yes" && homeOwnership === "yes" && state !== null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="qualify" className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col gap-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Are you ready to make the switch to solar?
            </h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Answer these quick questions to see if you qualify.
            </p>
          </div>

          <Card className="mx-auto max-w-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <CardHeader>
                  <CardTitle>Solar Qualification Check</CardTitle>
                  <CardDescription>Find out if you're eligible for our solar energy solutions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Is your credit score 650 or higher?</Label>
                    <RadioGroup value={creditScore || ""} onValueChange={setCreditScore}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="credit-yes" />
                        <Label htmlFor="credit-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="credit-no" />
                        <Label htmlFor="credit-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Is the title of your home under your name?</Label>
                    <RadioGroup value={homeOwnership || ""} onValueChange={setHomeOwnership}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="ownership-yes" />
                        <Label htmlFor="ownership-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="ownership-no" />
                        <Label htmlFor="ownership-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Which state do you live in?</Label>
                    <Select value={state || ""} onValueChange={setState}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {ELIGIBLE_STATES.map((stateName) => (
                          <SelectItem key={stateName} value={stateName}>
                            {stateName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">
                    Check Eligibility
                  </Button>
                </CardFooter>
              </form>
            ) : (
              <CardContent className="p-6 text-center">
                {isQualified ? (
                  <div className="flex flex-col items-center gap-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                    <h3 className="text-2xl font-bold">Congratulations!</h3>
                    <p className="text-muted-foreground">
                      Based on your answers, you qualify for our solar energy solutions. Take the next step toward
                      energy independence!
                    </p>
                    <Button asChild className="mt-4">
                      <a href="#contact">Get Your Free Consultation</a>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <XCircle className="h-16 w-16 text-destructive" />
                    <h3 className="text-2xl font-bold">We're Sorry</h3>
                    <p className="text-muted-foreground">
                      Based on your answers, you may not qualify for our standard solar program. However, we may have
                      other options available for you.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                      <a href="#contact">Contact Us to Learn More</a>
                    </Button>
                  </div>
                )}
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
