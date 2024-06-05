"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Textarea } from "@/components/ui/textarea"
import { useState } from 'react'
import Image from "next/image"



const Page = () => {
  const [imageUrl, setimageUrl] = useState<string>('');
  const [caption, setCaption] = useState<string>(' ');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [imagePrompt , setImagePrompt] = useState<string>(' ');
  const [captionPrompt , setCaptionPrompt] = useState<string>(' ');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.id === 'ImagePrompt') {
      setImagePrompt(e.target.value);
    }
    if (e.target.id === 'captionPrompt') {
      setCaptionPrompt(e.target.value);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();

    setLoading(true);
    try {

      const res = await fetch('/api/postGen/imageGen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ imagePrompt })
      });

      if (res.ok) {
        const {imageUrl} = await res.json();
        console.log('cled');
        setimageUrl(imageUrl);
      }else{
        setError(true);
        setLoading(false);
        return;
      }


     

     
      setError(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
      
      setError(true);
      setLoading(false);
    }
  }

  
  


  return (
    <>
      <div className='flex w-full flex-wrap flex-col  md:flex-row '>
            {/* promptCard */}
            <div className=' p-5 flex-[1] border-b-2 md:border-r-2 md:min-h-screen '>
            <Card className="w-[400px] mx-auto md:w-[600px] md:ml-6  md:mt-1">
                  <CardHeader>
                    <CardTitle>Create New Post</CardTitle>
                    <CardDescription>Give some details about your post.</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                  <CardContent>
                   
                      <div className="grid w-full items-center gap-4">
                        <div className="flex gap-2 flex-col space-y-1.5">
                          <Label htmlFor="name">Image</Label>
                          <Textarea id="ImagePrompt"  className="md:h-[100px]" onChange={handleChange} placeholder="Image prompt" />
                        </div>
                        <CardDescription>Enter how you want your image looks.</CardDescription>
                        <div className="flex gap-2 flex-col space-y-1.5">
                          <Label htmlFor="name">Caption</Label>
                          <Textarea id="captionPrompt" className="md:h-[100px]" onChange={handleChange} placeholder="Name of your project" />
                        </div>
                        <CardDescription>Enter some details about captions.</CardDescription>
                      </div>
                   
                  </CardContent>
                  <CardFooter className="flex justify-between ">
                    <Button className="mr-0 ml-auto" >Generate</Button>
                  </CardFooter>
                  </form>
            </Card>
            </div>

            {/* responseCard */}
            <div className='flex-[1] p-5 border-b-2 ' >
            <Card className="w-[400px] mx-auto lg:w-[90%]   md:ml-6 md:mt-1 ">
                <CardHeader>
                  <CardTitle>Your Post  </CardTitle>
                  <CardDescription>Please check your post , if it is correct or not.</CardDescription>
                </CardHeader>
                <CardContent>
                <div className="grid w-full items-center gap-4">
                      <div className=" gap-2 flex flex-col space-y-1.5">
                        <Label htmlFor="name">Image</Label>
                        <AspectRatio ratio={1 / 1}  className="bg-muted  " >
                        {
                          loading ? <div className="w-full h-full flex items-center justify-center">Loading...</div> : (
                            error ? <div className="w-full text-red-700 h-full flex items-center justify-center">Something Went wrong try again !</div> : (
                              <div className="">
                                {/*  eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={imageUrl}
                                  alt="AI IMAGE"
                                  className="rounded-md "
                                  
                                />
                              </div>
                            )
                          )
                        }
                      </AspectRatio>
                      </div>
                      <div className="flex gap-2 flex-col space-y-1.5">
                        <Label htmlFor="name">Caption</Label>
                        {
                          loading ? <div className="w-full h-full flex items-center justify-center">Loading...</div> : (
                            error ? <div className="w-full text-red-700 h-full flex items-center justify-center">Something Went wrong try again !</div> : (
                              <Textarea className="md:h-[85px]" id="name" value={caption} placeholder="Name of your project" />
                            )
                          )
                        }
                      </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between ">
                        
                  <Button className="mr-4 ml-auto ">copy caption</Button>
                  <Button className=" ">Download Image</Button>
                </CardFooter>
            </Card>
            </div>
      </div>
    </>
  )
}

export default Page;