import { Button, Flex, Loader, NumberInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import { privIns } from "../../api/instances";

export default function AddCreditsForm({userid, setInvalidate}) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    
    const form = useForm({initialValues: {
        id: userid,
        tries: 0
    }})
    
    const addCredits = (vals) => {
        setError(false)
        setLoading(true)
        privIns.put(`/users/${vals.id}/tries`, {tries: vals.tries}).then(e=> {
            setInvalidate(true)
        }).catch(err=> setError(true)).finally(()=> setLoading(false))
    }
    
   return (
    <form onSubmit={form.onSubmit(val=> {addCredits(val)})}>
      <Flex gap={8}>
         <NumberInput min={0} {...form.getInputProps("tries")} />
         <Button type={"submit"} disabled={form.values.tries == 0}>
            {loading ? <Loader/> :
            <IconPlus />
            }
         </Button>
      </Flex>
      {error && 
      <Text c={'red'}>Something went wrong</Text>
      }
    </form>
   );
}
