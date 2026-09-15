import { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, View } from "react-native";
interface Post {
    userId: number,
    id: number,
    title: string,
    completed: boolean 
}
export default function NewsFeed(){
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
        .then(json => json.json())
        .then((data: Post[]) => setPosts(data))
    }, [])
    return (
        <View>
            <ScrollView style={{height: 400}}>
            <FlatList data={posts} renderItem={({ item }) => 
        <Text style={{ padding: 10 }}>{item.title}</Text>
                } 
            keyExtractor={(item: Post) => item.id.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "gray" }} />}
            />
            </ScrollView>
        </View>
    )
}