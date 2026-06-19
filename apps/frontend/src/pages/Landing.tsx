import { Video } from "@/components/Video";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "../components/ui/carousel"

export function LandingPage() {
    return <div className="min-w-screen min-h-screen bg-black">
        <Carousel opts={{
            align: "start",
        }}
        className="w-full ml-20"
        >
            <CarouselContent>
                <CarouselItem className="basis-1/3">
                    <Video title={"Build a nice video"} url="https://cdn.higgsfield.ai/card/e74330e3-39d7-470b-817a-483cce45c255.mp4" />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <Video title={"Fancy video nice"} url="https://cdn.higgsfield.ai/card/7f5704c9-77bd-416a-8d7f-8f7e8baf6a21.mp4" />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <Video title={"Fancy video nice"} url="https://cdn.higgsfield.ai/card/7f5704c9-77bd-416a-8d7f-8f7e8baf6a21.mp4" />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <Video title={"Fancy video nice"} url="https://cdn.higgsfield.ai/card/7f5704c9-77bd-416a-8d7f-8f7e8baf6a21.mp4" />
                </CarouselItem>
                <CarouselItem className="basis-1/3">
                    <Video title={"Fancy video nice"} url="https://cdn.higgsfield.ai/card/7f5704c9-77bd-416a-8d7f-8f7e8baf6a21.mp4" />
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
}

