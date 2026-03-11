'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  MessageCircle, 
  Heart, 
  Share2,
  Server,
  Wifi,
  WifiOff,
  Database,
  Globe,
  Zap,
  Shield,
  AlertCircle,
  RefreshCw,
  Settings,
  BarChart3,
  LineChart,
  Eye,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import { dummyTrackedPages, dummyPosts, dummyComments, dummyInsights } from '@/lib/dummyData';
import { AppLayout } from '../components/AppLayout';

function MonitoringContent() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedTimeRange, setSelectedTimeRange] = useState('24h');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [systemStatus, setSystemStatus] = useState('operational');

  useEffect(() => {
    setMounted(true);
    setTimeout(() => setLoading(false), 1000);
    
    if (autoRefresh) {
      const interval = setInterval(() => {
        // Simulate real-time updates
        setSystemStatus(['operational', 'degraded', 'maintenance'][Math.floor(Math.random() * 3)]);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-lg text-gray-600">Loading Monitoring...</p>
        </div>
      </div>
    );
  }

  const getSystemHealth = () => {
    return {
      api: { status: 'operational', responseTime: 124, uptime: '99.9%', lastCheck: '2 mins ago' },
      database: { status: 'operational', responseTime: 89, uptime: '99.95%', lastCheck: '1 min ago' },
      metaApi: { status: 'degraded', responseTime: 456, uptime: '98.5%', lastCheck: '3 mins ago' },
      syncService: { status: 'operational', responseTime: 234, uptime: '99.7%', lastCheck: '30 secs ago' },
      cdn: { status: 'operational', responseTime: 45, uptime: '100%', lastCheck: '1 min ago' }
    };
  };

  const getPerformanceMetrics = () => {
    return [
      { metric: 'API Response Time', current: 124, target: 200, unit: 'ms', status: 'good' },
      { metric: 'Database Query Time', current: 89, target: 150, unit: 'ms', status: 'good' },
      { metric: 'Page Load Time', current: 1.2, target: 2.0, unit: 's', status: 'good' },
      { metric: 'Error Rate', current: 0.02, target: 0.05, unit: '%', status: 'good' },
      { metric: 'Cache Hit Rate', current: 94.2, target: 90, unit: '%', status: 'good' },
      { metric: 'Memory Usage', current: 67.3, target: 80, unit: '%', status: 'good' }
    ];
  };

  const getAlerts = () => {
    return [
      {
        id: '1',
        type: 'warning',
        title: 'Meta API Rate Limit Approaching',
        description: 'Current usage: 85% of hourly limit',
        time: '5 mins ago',
        severity: 'medium',
        resolved: false
      },
      {
        id: '2',
        type: 'info',
        title: 'Scheduled Maintenance',
        description: 'Database backup completed successfully',
        time: '15 mins ago',
        severity: 'low',
        resolved: true
      },
      {
        id: '3',
        type: 'error',
        title: 'Sync Service Delay',
        description: 'Page sync running 2 minutes behind schedule',
        time: '8 mins ago',
        severity: 'high',
        resolved: false
      },
      {
        id: '4',
        type: 'success',
        title: 'New Peak Traffic Record',
        description: '1,234 concurrent users handled successfully',
        time: '1 hour ago',
        severity: 'low',
        resolved: true
      }
    ];
  };

  const getActivityLog = () => {
    return [
      { action: 'Page Sync', details: 'Coca-Cola - 12 new posts synced', time: '2 mins ago', status: 'success' },
      { action: 'User Login', details: 'user@example.com authenticated', time: '5 mins ago', status: 'success' },
      { action: 'Report Generated', details: 'Performance report for Nike', time: '12 mins ago', status: 'success' },
      { action: 'API Error', details: 'Meta API timeout - retry successful', time: '15 mins ago', status: 'warning' },
      { action: 'Cache Cleared', details: 'Redis cache cleared for maintenance', time: '1 hour ago', status: 'info' },
      { action: 'Data Backup', details: 'Daily backup completed', time: '2 hours ago', status: 'success' }
    ];
  };

  const getResourceUsage = () => {
    return [
      { resource: 'CPU Usage', current: 34, maximum: 100, unit: '%' },
      { resource: 'Memory Usage', current: 67.3, maximum: 100, unit: '%' },
      { resource: 'Disk Usage', current: 45, maximum: 100, unit: '%' },
      { resource: 'Network I/O', current: 23, maximum: 100, unit: '%' },
      { resource: 'Database Connections', current: 12, maximum: 20, unit: 'count' }
    ];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600';
      case 'degraded': return 'text-yellow-600';
      case 'maintenance': return 'text-blue-600';
      case 'error': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'operational': return <Badge className="bg-green-100 text-green-800">Operational</Badge>;
      case 'degraded': return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'maintenance': return <Badge className="bg-blue-100 text-blue-800">Maintenance</Badge>;
      case 'error': return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'info': return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const systemHealth = getSystemHealth();

  return (
    <div className="container mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">System Monitoring</h1>
            <p className="text-muted-foreground">Real-time system health and performance metrics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${systemStatus === 'operational' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-sm font-medium capitalize">{systemStatus}</span>
          </div>
          <Button
            variant={autoRefresh ? 'default' : 'outline'}
            size="sm"
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh
          </Button>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1h">Last hour</SelectItem>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries(systemHealth).map(([service, health]) => (
          <Card key={service}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium capitalize">{service.replace(/([A-Z])/g, ' $1').trim()}</span>
                {getStatusBadge(health.status)}
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Response Time:</span>
                  <span>{health.responseTime}ms</span>
                </div>
                <div className="flex justify-between">
                  <span>Uptime:</span>
                  <span>{health.uptime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Last Check:</span>
                  <span>{health.lastCheck}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Monitoring Content */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getPerformanceMetrics().map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{metric.metric}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress 
                            value={(metric.current / metric.target) * 100} 
                            className="flex-1"
                          />
                          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
                            {metric.current}{metric.unit}
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant={metric.status === 'good' ? 'default' : 'destructive'}
                        className="ml-2"
                      >
                        {metric.current <= metric.target ? 'Good' : 'Warning'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  <div className="text-center">
                    <LineChart className="w-16 h-16 mx-auto mb-4" />
                    <p>Response time trends</p>
                    <p className="text-sm">API, Database, and CDN performance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getAlerts().map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold">{alert.title}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant={alert.severity === 'high' ? 'destructive' : alert.severity === 'medium' ? 'default' : 'secondary'}>
                            {alert.severity}
                          </Badge>
                          {alert.resolved && <Badge variant="outline">Resolved</Badge>}
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getActivityLog().map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Resource Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getResourceUsage().map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{resource.resource}</span>
                      <span className="text-sm text-muted-foreground">
                        {resource.current}{resource.unit} / {resource.maximum}{resource.unit}
                      </span>
                    </div>
                    <Progress 
                      value={(resource.current / resource.maximum) * 100} 
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 font-mono text-sm">
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-blue-600">[INFO]</span> 2024-03-12 15:30:45 - System startup completed
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-green-600">[SUCCESS]</span> 2024-03-12 15:31:02 - Database connection established
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-blue-600">[INFO]</span> 2024-03-12 15:31:15 - Meta API service initialized
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-yellow-600">[WARNING]</span> 2024-03-12 15:32:01 - High memory usage detected (67%)
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-green-600">[SUCCESS]</span> 2024-03-12 15:32:45 - Cache cleared successfully
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-red-600">[ERROR]</span> 2024-03-12 15:33:12 - Meta API timeout (5000ms)
                </div>
                <div className="p-2 bg-gray-50 rounded">
                  <span className="text-green-600">[SUCCESS]</span> 2024-03-12 15:33:15 - API retry successful
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Dependencies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <span>Supabase Database</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>Meta Graph API</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4" />
                      <span>Vercel CDN</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Authentication Service</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Database Connectivity</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API Endpoints</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Cache Service</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Background Jobs</span>
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>SSL Certificate</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Domain Configuration</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function MonitoringPage() {
  return (
    <AppLayout>
      <MonitoringContent />
    </AppLayout>
  );
}
