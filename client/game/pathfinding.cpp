#include <algorithm>
#include <cmath>
#include <vector>
#include <queue>
using namespace std;

// Helpers
namespace {

typedef double Disttype;
typedef long long CT; // product type

struct Pos {
	int x, y;
	CT cross(Pos p) {
		return x*(CT)p.y - y*(CT)p.x;
	}
};

bool operator==(const Pos& a, const Pos& b) {
	return a.x == b.x && a.y == b.y;
}
Pos operator-(const Pos& a, const Pos& b) {
	Pos r = {a.x - b.x, a.y - b.y};
	return r;
}
CT sq(int x) {
	return x * x;
}
Disttype dist(const Pos& a, const Pos& b) {
	CT d2 = sq(a.x - b.x) + sq(a.y - b.y);
	return (Disttype)sqrt(d2);
}

struct Point {
	Pos pos;
	vector<pair<int, Disttype> > edges;
};

struct Dist {
	int to, from;
	Disttype dist;
};
bool operator<(const Dist& a, const Dist& b) {
	return a.dist > b.dist;
}

vector<int> dijkstra(const vector<Point>& points, int from, int to) {
	priority_queue<Dist> q;
	Dist noDist = {-1, -1, -1}, startDist = {from, -1, 0};
	vector<Dist> dist(points.size(), noDist);
	q.push(startDist);
	while (!q.empty()) {
		Dist n = q.top();
		q.pop();
		int ind = n.to;
		if (dist[ind].to != -1)
			continue;
		dist[ind] = n;
		const Point& p = points[ind];
		for (pair<int, Disttype> pa : p.edges) {
			int e = pa.first;
			Disttype d2 = pa.second;
			Dist d = {e, ind, n.dist + d2};
			q.push(d);
		}
	}

	vector<int> path;
	if (dist[to].to == -1)
		return path;

	while (to != from) {
		path.push_back(to);
		to = dist[to].from;
	}
	reverse(path.begin(), path.end());
	return path;
}

struct Rect {
	// top left, top right, bottom left, bottom right
	Pos p[4];
};

struct Map {
	vector<Rect> rects;
	vector<Pos> points;
	vector<vector<bool> > reachable;
};

bool pointWithin(const Rect& re, Pos p) {
	return (re.p[0].x < p.x && p.x < re.p[1].x && re.p[0].y < p.y && p.y < re.p[2].y);
}

// I have no idea how this works; I just stole it from KACTL and modified it
// in some ad-hoc manner.
bool openSegmentIntersection(Pos s1, Pos e1, Pos s2, Pos e2) {
	if (e1 == s1 || e2 == s2)
		return false;

	Pos v1 = e1-s1, v2 = e2-s2;

	CT a = v1.cross(v2);
	if (a == 0)
		return false;

	Pos d = s2-s1;
	CT a1 = v1.cross(d), a2 = v2.cross(d);
	if (a < 0) { a = -a; a1 = -a1; a2 = -a2; }
	if (0<=a1 || a<=-a1 || 0<=a2 || a<=-a2)
		return false;
	return true;
}

bool lineRectIntersect(const Rect& re, Pos from, Pos to) {
	if (pointWithin(re, from) || pointWithin(re, to))
		return true;
	if (openSegmentIntersection(re.p[0], re.p[3], from, to))
		return true;
	if (openSegmentIntersection(re.p[1], re.p[2], from, to))
		return true;
	return false;
}

bool straightPath(Map* map, Pos from, Pos to) {
	for (Rect& re : map->rects) {
		if (lineRectIntersect(re, from, to))
			return false;
	}
	return true;
}

}

extern "C" {

Map* setup_pathfinding(int npoints, int* apoints, int nrects, int* arects) {
	Map* m = new Map();
	int ind = 0;
	for (int i = 0; i < npoints; ++i) {
		int x = apoints[ind++];
		int y = apoints[ind++];
		Pos p = {x, y};
		m->points.push_back(p);
	}

	ind = 0;
	for (int i = 0; i < nrects; ++i) {
		Rect re;
		for (int j = 0; j < 4; ++j) {
			Pos p;
			p.x = arects[ind++];
			p.y = arects[ind++];
			re.p[j] = p;
		}
		m->rects.push_back(re);
	}

	m->reachable.assign(npoints, vector<bool>(npoints));
	for (int i = 0; i < npoints; ++i) {
		m->reachable[i][i] = true;
		for (int j = i+1; j < npoints; ++j) {
			bool r = straightPath(m, m->points[i], m->points[j]);
			m->reachable[i][j] = m->reachable[j][i] = r;
		}
	}

	return m;
}

void clear_pathfinding(Map* map) {
	delete map;
}

int pathfind(
	Map* map,
	int startx, int starty,
	int endx, int endy,
	int* outSize, int** out
) {
	vector<Point> points;
	for (Pos p : map->points) {
		Point p2;
		p2.pos = p;
		points.push_back(p2);
	}

	Point start = {{startx, starty}}, end = {{endx, endy}};
	int npoints = (int)points.size();
	int starti = npoints, endi = npoints + 1;
	points.push_back(start);
	points.push_back(end);

	for (int i = 0; i < (int)points.size(); ++i) {
		for (int j = 0; j < (int)points.size(); ++j) {
			bool reachable = false;
			if (i < npoints && j < npoints) {
				reachable = map->reachable[i][j];
			}
			else {
				reachable = straightPath(map, points[i].pos, points[j].pos);
			}
			if (reachable) {
				Disttype d = dist(points[i].pos, points[j].pos);
				points[i].edges.push_back(make_pair(j, d));
			}
		}
	}

	vector<int> path = dijkstra(points, starti, endi);

	if (path.empty())
		return 0;

	*outSize = (int)path.size();
	*out = new int[path.size() * 2];
	int ind = 0;
	for (int p : path) {
		(*out)[ind++] = points[p].pos.x;
		(*out)[ind++] = points[p].pos.y;
	}

	return 1;
}

void free_path(int* path) {
	delete[] path;
}

}

#ifdef CPLUSPLUS_TESTING
#include <iostream>

int main() {
	int N;
	cin >> N;

	vector<int> points;
	for (int i = 0; i < N*8; ++i) {
		int c;
		cin >> c;
		points.push_back(c);
	}

	int startx, starty, endx, endy;
	cin >> startx >> starty >> endx >> endy;

	Map* map = setup_pathfinding(N*4, &points[0], N, &points[0]);

	int outSize, *out;
	int res = pathfind(map, startx, starty, endx, endy, &outSize, &out);
	if (res) {
		vector<int> path(out, out + outSize*2);
		cout << outSize << endl;
		for (int i = 0; i < outSize; ++i) {
			cout << "(" << path[i*2] << ", " << path[i*2+1] << ")" << endl;
		}
		free_path(out);
	}
	else {
		cout << "no path" << endl;
	}

	clear_pathfinding(map);
	return 0;
}
#endif
