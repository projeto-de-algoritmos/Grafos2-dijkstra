#include <bits/stdc++.h>

using namespace std;
using ii = pair<int, int>;
using edge = tuple<int, int, int>;

const int MAX { 100010 }, oo { 1000000010 };
int dist[MAX];
vector<ii> adj[MAX];
bitset<MAX> processed;

void dijkstra(priority_queue<ii, vector<ii>, greater<ii>> pq, int N)
{
    for (int i = 1; i <= N; ++i)
        dist[i] = oo;
    
    processed.reset();

    while (not pq.empty())
    {
        auto [d, u] = pq.top();
        pq.pop();

        if (processed[u])
            continue;

        processed[u] = true;

        for (const auto& [v, w] : adj[u])
        {
            if (dist[v] > d + w) {
                dist[v] = d + w;
                pq.push(ii(dist[v], v));
            }
        }
    }
}

int solve(int N, int K, int cons = 100){
    auto test = oo;
    int out = 0;

    for (size_t i = 1; i <= N; i++)
        if(test > dist[(cons*i) + K]){
            test = dist[(cons*i)];
            out = (cons*i) + K;
        }

    return out;
}

int main(int argc, char const *argv[])
{
    int N, K, cons = 100;
    bitset<100> sameFloor;

    while(scanf("%d %d", &N, &K) == 2){
        priority_queue<ii, vector<ii>, greater<ii>> sources;
        map<int, vector<int>> link;
        map<int, int> Ts;
        int aux;

        sameFloor.reset();

        for (size_t i = 1; i <= N; i++)
            cin >> aux, Ts[i] = aux;
            
        cin.ignore(numeric_limits<streamsize>::max(), '\n');

        for (size_t i = 0; i < 500; i++)
            adj[i].clear();        

        for (size_t i = 1; i <= N; i++){
            vector<int> floor;
            string temp;
            
            getline(cin, temp);

            stringstream line(temp);

            while(line >> aux)
                floor.push_back(aux);

            for (size_t j = 0; j < floor.size(); j++)
            {
                auto hash = (cons*i)+floor[j];

                if(floor[j] == 0){
                    sources.push( { 0, hash } );
                    dist[hash] = 0;
                }
                
                if(sameFloor[floor[j]]){
                    for(const auto& x : link[floor[j]]){
                        adj[hash].push_back( { x, 60 } );
                        adj[x].push_back( { hash, 60 } );
                    }

                    link[floor[j]].push_back( hash );
                }
                else {
                    sameFloor[floor[j]] = 1;
                    link[floor[j]].push_back( hash );
                }

                if(j+2 <= floor.size()){
                    auto hashNext = (cons*i)+floor[j+1];
                    auto weight = (floor[j+1] - floor[j]) * Ts[i];
                    adj[hash].push_back( { hashNext, weight } );
                    adj[hashNext].push_back( { hash, weight } );
                }
            }
        }

        for (size_t i = 100; i <= 499; i++)
        {
            if(not adj[i].empty()){
                cout << i << endl;
                for(const auto& [v, w] : adj[i]){
                    cout << v <<  " x " << w << " | ";
                }
                cout << endl;
            }

        }
        
        dijkstra(sources, 500);

        auto out = solve(N, K);        
        
        if (dist != 0)
            cout << dist[out] << endl;
        else
            cout << "IMPOSSIBLE" << endl;
    }

    return 0;
}