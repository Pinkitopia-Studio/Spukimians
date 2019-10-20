/*
Utilizado para los fantasmitos
*/
function findPath(world, pathStart, pathEnd)
{
  	//atajo de tecleo
	var	abs = Math.abs;

	var worldWidth = world[0].length;
	var worldHeight = world.length;
	var worldSize =	worldWidth * worldHeight;

	//var findNeighbours = function(){}; 
    
    function Distancia(Point, Goal)
	{	
		return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
	}
    
	function Neighbours(x, y)
	{
		var	N = y - 1,
		S = y + 1,
		E = x + 1,
		W = x - 1,
		myN = N > -1 && sepuedeandar(x, N),
		myS = S < worldWidth && sepuedeandar(x, S),
		myE = E < worldHeight && sepuedeandar(E, y),
		myW = W > -1 && sepuedeandar(W, y),
		result = [];
		if(myN)
		result.push({x:x, y:N});
		if(myE)
		result.push({x:E, y:y});
		if(myS)
		result.push({x:x, y:S});
		if(myW)
		result.push({x:W, y:y});
		//findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
		return result;
	}
    
    
	function sepuedeandar(x, y)
	{
        if (x > -1 && y > -1){
            if (y < worldWidth && x < worldHeight) return ((world[x][y] == 4));
        }
		return false;
	};
    
    
	function Node(Parent, Point)
	{
		var newNode = {
			Parent:Parent,
			value:Point.x + (Point.y * worldWidth),
			x:Point.x,
			y:Point.y,
			f:0,
			g:0
		};

		return newNode;
	}
    
    	
	function calculatePath()
	{
		// crea nodos de inicio y final
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		//array con todos los nodos del mundo
		var AStar = new Array(worldSize);
        
        //Lista abierta, cerrada y final (A estrella)
		var Open = [mypathStart];
        
		var Closed = [];
        
		var result = [];
        
		// referencias a vecinos
		var myNeighbours;
		// nodo actual
		var myNode;
		
		var myPath;
		// PA CALCULOS REVISAR
		var length, max, min, i, j;
		// mientras no hayamos encontrado el resultado y tengamos más nodos
		while(length = Open.length)
		{
			max = worldSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
            
			myNode = Open.splice(min, 1)[0];
            
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
                
				AStar = Closed = Open = [];
                
				result.reverse();
			}
			else // no estamos en el destino
			{
				// coger los nodos caminables vecinos
				myNeighbours = Neighbours(myNode.x, myNode.y);
				//si no los hemos visitao
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
                        
						myPath.g = myNode.g + Distancia(myNeighbours[i], myNode);
                        
						myPath.f = myPath.g + Distancia(myNeighbours[i], mypathEnd);
                        
						Open.push(myPath);
                        
						AStar[myPath.value] = true;
					}
				}
                
				Closed.push(myNode);
			}
		} 
		return result;
	}
    
	return calculatePath();

}
