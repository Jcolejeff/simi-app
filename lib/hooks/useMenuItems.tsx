import { DynamicObject } from "@/lib/type"
import { useEffect, useState } from "react"

export const useMenuItems =() => {
    const [menuItems, setMenuItems] = useState<DynamicObject[]>([])

    useEffect(() => {
        if(process.env.NODE_ENV !== 'production') {
            setMenuItems([
              {
                 name: "HOME",
                 link: "/",
                 component: "/",
              },
              {
                 name: "INTERNSHIP",
                 link: "/internship/hng-ix",
              },
              {
                 name: "HIRE TALENTS",
                 link: "/hire-talents",
              },
              {
                 name: "BUILD A TEAM",
                 link: "/buildTeam",
              },
              {
                 name: "LETS TALK",
                 link: "/get-in-touch",
              },
              {
                 name: "HNG ADVANCED",
                 link: "/advanced",
              },
           ])
        }else{
            setMenuItems([
              {
                 name: "HOME",
                 link: "/",
                 component: "/",
              },
              {
                 name: "COHORTS",
                 link: "/cohorts/hng-ix",
              },
              {
               name: "LETS TALK",
               link: "/get-in-touch",
              },
              {
               name: "HNG ADVANCED",
               link: "/advanced",
              },
           ])
  
        }
      }, [])

      return {
        menuItems
    }
}